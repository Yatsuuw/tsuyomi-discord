# Tsuyomi

Discord bot that searches anime, manga, light novels, characters and staff through the [AniList](https://docs.anilist.co/guide/introduction) GraphQL API, and shares AniList, MyAnimeList and Mangacollec profiles.

AniList is the only API the bot calls: MyAnimeList and Mangacollec profiles are shared as links.

## Commands

| Command                                                 | Purpose                                                                                                                                                                                                                                                              |
| ------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/init setup`                                           | Registers the server in the database (server + owner). Until it has been run, the bot refuses to work on the server. Like `/init remove`, restricted to members with the "Manage Server" permission.                                                                 |
| `/init remove`                                          | Deletes that record: the bot stops working on the server until `/init setup` is run again. The record is also deleted when the bot leaves the server.                                                                                                                |
| `/search anime\|manga\|novel\|character\|staff <query>` | Searches AniList: 10 results per page, first / previous / next / last navigation, selection of a result, then "Validate" or "Delete". Only the person searching sees the result list; the validated sheet is posted for everyone. Accents are optional in the query. |
| `/config lang <language>`                               | Language of the bot's replies: English, French, or "Default" to go back to the default one (English), which is used until the user chooses otherwise.                                                                                                                |
| `/config anilist\|myanimelist\|mangacollec [username]`  | Links a profile. Without a username, the profile is unlinked. A user with no setting left is deleted from the database.                                                                                                                                              |
| `/config sharing <allow>`                               | Lets other users share the linked profiles of the user with `/profile`, or stops them. Nobody else can share them until the user allows it.                                                                                                                          |
| `/config delete`                                        | Deletes everything the bot saved about the user.                                                                                                                                                                                                                     |
| `/profile anilist\|myanimelist\|mangacollec [user]`     | Shares a linked profile in an embed: the one of the person running the command, or the one of the user given if that user allowed it.                                                                                                                                |
| `/help`                                                 | Lists the commands with their arguments and how to use them, and says where to report a problem. Only the person asking sees it. Works on servers that are not initialised yet.                                                                                      |

The bot also shows an activity under its name ("Watching Laid-Back Camp Season 4"), defined in `src/features/presence/model/presence.ts`.

Commands work on initialised servers and in private conversations. Outside servers, the user must have installed the application on their account ("User Install" has to be enabled in the Discord developer portal).

## Legal

- [Privacy Policy](PRIVACY.md): what the bot stores, what it sends to AniList, and how to have data removed.
- [Terms of Service](TERMS.md): the conditions for using the bot.

## Installation

Requirements: Node.js 24+ and pnpm.

```bash
pnpm install
cp .env.example .env   # then fill in the variables
pnpm db:generate       # generates the Prisma client
pnpm db:deploy         # creates / updates the SQLite database
```

## Scripts

| Script              | Purpose                                                                 |
| ------------------- | ----------------------------------------------------------------------- |
| `pnpm dev`          | Runs the development bot, restarting on every change.                   |
| `pnpm deploy:local` | Deploys the commands to the development server (available immediately). |
| `pnpm deploy:prod`  | Deploys the commands globally with the production bot.                  |
| `pnpm build`        | Generates the Prisma client and compiles the project to `dist/`.        |
| `pnpm start`        | Runs the production bot (compiled).                                     |
| `pnpm lint`         | Checks the code and its formatting.                                     |
| `pnpm lint:fix`     | Fixes what can be fixed automatically.                                  |
| `pnpm db:migrate`   | Creates a migration after a change to `prisma/schema.prisma`.           |

`pnpm dev` and `pnpm deploy:local` use the `*_DEV` variables; `pnpm start` and `pnpm deploy:prod` use the `*_PROD` ones.

## Docker

The images are built by GitHub Actions ([`.github/workflows/docker.yml`](.github/workflows/docker.yml)) on every push to `master` and on every `v*` tag, then published to the GitHub Container Registry:

| Image                                     | Content                             |
| ----------------------------------------- | ----------------------------------- |
| `ghcr.io/yatsuuw/tsuyomi-discord`         | The bot.                            |
| `ghcr.io/yatsuuw/tsuyomi-discord-migrate` | The one-off database migration job. |

The production server builds nothing: it only needs `compose.yaml`, a `.env` file holding `DISCORD_TOKEN_PROD` and `CLIENT_ID_PROD`, and a `data` folder. The packages being private, Docker must be logged in to `ghcr.io` with a token allowed to read them. Then:

```bash
docker compose up -d
```

The same command updates the bot: the newest images are pulled on every start.

To build the image locally instead, run `docker build -t tsuyomi .` (and `docker build -t tsuyomi-migrate --target migrate .` for the migration job).

Compose starts two services, neither of which publishes a port:

| Service   | Purpose                                                                                                   |
| --------- | --------------------------------------------------------------------------------------------------------- |
| `migrate` | One-off job applying the Prisma migrations, without network access. The bot starts once it has succeeded. |
| `bot`     | The bot. Read-only file system, no privileges, 160 MB memory limit.                                       |

### Database file

The SQLite database is the file `data/tsuyomi.sqlite`, next to `compose.yaml`: the `./data` folder of the host is mounted in both services. On Linux, the folder must be writable by user 1000, the one the containers run as:

```bash
mkdir -p data && sudo chown 1000:1000 data
```

Stop the bot before touching the file, so that nothing is being written to it:

```bash
docker compose stop bot
cp data/tsuyomi.sqlite backup.sqlite     # backup
cp backup.sqlite data/tsuyomi.sqlite     # restore, or import of another file
docker compose up -d
```

An imported file must have been created by this bot: on start, `migrate` checks the migration history stored in the file and applies the migrations it lacks.

### Image

The bot image holds nothing but what the bot runs on: the Node binary and the libraries it links, certificate authorities, language data for English and French, the production dependencies and the compiled code. It has no shell and no package manager, and weighs about 140 MB. Node runs with `--optimize-for-size`; the bot uses around 50 MB of memory. The image sets no memory cap: the limit is the one of `compose.yaml`.

Adding a language to the bot also means adding it to the `LOCALES` argument of the `Dockerfile`, otherwise its dates and numbers are formatted in English.

## Structure

The code is organised in layers: each top-level folder answers a single question, and a layer only imports the ones below it. Apart from the two entry points, a folder holds either files or sub-folders, never both.

```
prisma/                  schema and migrations
src/
  index.ts               entry point of the bot
  deploy.ts              command deployment

  commands/              what Discord calls: one command per file (loaded automatically)
  events/                what Discord emits: one event per file (loaded automatically)

  features/              what the commands do, one folder per feature
    search/
      model/             what a search is: types, constants, state carried by the buttons
      lookup/            running a search: fetching and cache
      kinds/             one kind of search per file (anime / manga / light novel, character, staff)
      page/              result page: pagination, list, menu and buttons
      embeds/            detailed sheets
    profiles/
      model/             contract of a platform, shape of a profile
      factories/         the two kinds of platform: read through an API, or shared as links
      mappers/           conversion of an API answer to the shared profile shape
      platforms/         one platform per file (+ index.ts listing them)
      share/             what sharing a profile involves: finding the linked username, saying who shares it
      embeds/            profile embeds
    settings/
      model/             contract of a /config subcommand, constants
      actions/           one /config subcommand per file
    help/
      model/             commands presented, where to report a problem
      usage/             ways of writing a command, read from its definition
      embeds/            help embed
    presence/
      model/             activity shown under the name of the bot

  services/              access to external systems
    anilist/
      api/               GraphQL client and requests
      queries/           one query per file
      model/             types of the AniList objects, constants
      format/            formatting of AniList data (titles, names, links, dates)
    http/                JSON requests with timeout and error handling
    database/            Prisma client and database access

  core/                  foundation of the bot, free of business logic
    client/              Discord client, module loading, clean shutdown
    builders/            helpers declaring a command, an event or an embed footer
    types/               contracts of a command and of an event
    errors/              centralised error handling
    env/                 environment variables

  i18n/
    translator/          translation function and language choice
    locales/             one language per file (+ index.ts listing them)

  utils/                 generic helpers, independent from the rest of the project
    discord/             message components, embed fields, ephemeral replies
    text/                text shortening, clean-up and markdown
    cache/               in-memory cache
    logging/             logger
```

Every error ends up in `src/core/errors/handleError.ts`: expected errors (`UserError`) are translated and shown to the user, the others are logged without ever stopping the bot.
