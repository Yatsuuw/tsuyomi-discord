// @prisma/client declares the Prisma CLI and TypeScript as optional peers. Both are development tools of
// this project, so pnpm would link them to the client and pull them (hundreds of MB) into production
// installs. The generated client needs neither at runtime: drop the link.
module.exports = {
  hooks: {
    readPackage(pkg) {
      if (pkg.name === '@prisma/client') {
        pkg.peerDependencies = {};
        pkg.peerDependenciesMeta = {};
      }
      return pkg;
    },
  },
};
