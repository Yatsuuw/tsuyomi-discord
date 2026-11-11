# syntax=docker/dockerfile:1

# Alpine release shared by every stage, so that the native SQLite module built here runs unchanged in the
# final image (same C library, same Node 24 ABI).
ARG ALPINE=3.24
ARG DATABASE_URL=file:/app/data/tsuyomi.sqlite

# ---- Shared base of the install stages: official Node image, pnpm and the dependency manifests --------
FROM node:24-alpine${ALPINE} AS base
ARG DATABASE_URL
WORKDIR /app
ENV DATABASE_URL=${DATABASE_URL}
RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .pnpmfile.cjs ./

# ---- Build: every dependency, Prisma client generation, TypeScript compilation ------------------------
FROM base AS build
RUN pnpm install --frozen-lockfile
COPY prisma.config.ts tsconfig.json ./
COPY prisma ./prisma
COPY src ./src
RUN pnpm build

# ---- Production dependencies only, stripped of everything Node never loads -----------------------------
FROM base AS deps
# Removed: every Prisma query compiler but the one the generated client imports (SQLite, small build, ES
# module), the Prisma runtimes for browsers and edge platforms, source maps, type declarations, docs, and
# the C sources better-sqlite3 was compiled from (only its .node binary is needed).
RUN pnpm install --frozen-lockfile --prod \
  && cd node_modules/.pnpm \
  && find . -path '*/@prisma/client/runtime/*' \
    \( -name 'query_compiler_*' ! -name 'query_compiler_small_bg.sqlite*.mjs' \
       -o -name 'wasm-compiler-edge.*' -o -name 'index-browser.*' \) -delete \
  && find . \( -name '*.map' -o -name '*.d.ts' -o -name '*.d.mts' -o -name '*.d.cts' -o -name '*.md' \) -delete \
  && rm -rf @types+* better-sqlite3@*/node_modules/better-sqlite3/deps better-sqlite3@*/node_modules/better-sqlite3/src

# ---- Migration job: `docker build --target migrate`, run once before each new version -----------------
# Kept apart from the bot so that the Prisma CLI never ends up in the production image.
FROM build AS migrate
RUN mkdir data && chown node:node data
USER node
# The Prisma CLI is called directly, not through pnpm, which corepack would download again for this user:
# the job needs no network access. CHECKPOINT_DISABLE turns off Prisma's own update check.
ENV CHECKPOINT_DISABLE=1
CMD ["node_modules/.bin/prisma", "migrate", "deploy"]

# ---- Root file system of the production image, assembled file by file ---------------------------------
# Only what the bot needs to run: Alpine's Node binary (52 MB, against 126 MB for the official one), the
# shared libraries it links, and the language data of the bot's languages. No shell, no package manager.
FROM alpine:${ALPINE} AS rootfs
# Languages the bot formats dates and numbers in, on top of English. Add a language here when adding its
# file to src/i18n/locales.
ARG LOCALES="fr"
RUN set -eu; \
  apk add --no-cache nodejs icu; \
  mkdir -p /rootfs/usr/bin /rootfs/etc /rootfs/tmp /rootfs/app/data; \
  cp /usr/bin/node /rootfs/usr/bin/node; \
  for lib in $(ldd /usr/bin/node | awk '$3 ~ "^/" { print $3 }' | sort -u); do \
    mkdir -p "/rootfs$(dirname "$lib")"; \
    cp -L "$lib" "/rootfs$lib"; \
  done; \
  # Language data (ICU). Alpine installs English only, in which other languages fall back to English; the
  # full set weighs 33 MB. The full file is trimmed down to the items of the English one, the bot's
  # languages and the few dictionaries ICU insists on: about 8 MB.
  data=$(ls /usr/share/icu/*/icudt*.dat); \
  # Listing the English file reports the dictionaries it lacks as an error: only the list matters here.
  icupkg -l "$data" > /tmp/keep.txt 2> /dev/null || test -s /tmp/keep.txt; \
  apk add --no-cache icu-data-full; \
  icupkg -l "$data" > /tmp/all.txt; \
  for locale in $LOCALES; do grep -E "(^|/)${locale}\.res$" /tmp/all.txt >> /tmp/keep.txt; done; \
  grep "brkitr/.*dict" /tmp/all.txt >> /tmp/keep.txt; \
  # icupkg only reads a list of items from a file whose name ends in .txt.
  grep -vxF -f /tmp/keep.txt /tmp/all.txt > /tmp/remove.txt; \
  mkdir -p "/rootfs$(dirname "$data")"; \
  icupkg -r /tmp/remove.txt "$data" "/rootfs$data"; \
  # Certificate authorities: Alpine's Node checks TLS connections against the system's bundle.
  mkdir -p /rootfs/etc/ssl/certs; \
  cp /etc/ssl/certs/ca-certificates.crt /rootfs/etc/ssl/certs/; \
  ln -s certs/ca-certificates.crt /rootfs/etc/ssl/cert.pem; \
  # Unprivileged user the bot runs as, owner of the only writable folder.
  echo 'node:x:1000:1000:node:/app:/sbin/nologin' > /rootfs/etc/passwd; \
  echo 'node:x:1000:' > /rootfs/etc/group; \
  chmod 1777 /rootfs/tmp; \
  chown 1000:1000 /rootfs/app/data

# ---- Production image (default target): the root file system above, the dependencies, the bot ----------
FROM scratch AS runtime
ARG DATABASE_URL
COPY --from=rootfs /rootfs /
WORKDIR /app
ENV NODE_ENV=production DATABASE_URL=${DATABASE_URL}
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package.json ./
USER node
VOLUME /app/data
# --optimize-for-size makes V8 favour memory over speed (small young generation, compact code): measured
# on this bot, the container uses about 40 % less memory with no visible slowdown. The image sets no
# memory cap: V8 sizes its heap from the limit given to the container (see compose.yaml).
CMD ["/usr/bin/node", "--optimize-for-size", "dist/index.js"]
