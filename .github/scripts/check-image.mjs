// Run inside the image of the bot by .github/workflows/checks.yml, without network access.
// The image is stripped by hand, so each check targets something a dependency update could break.

// The native SQLite module and the Prisma query compiler: write a row, read it back.
const { prisma } = await import('/app/dist/services/database/prisma.js');
await prisma.user.upsert({ where: { id: '1' }, create: { id: '1', lang: 'fr' }, update: {} });
const user = await prisma.user.findUnique({ where: { id: '1' } });
if (user?.lang !== 'fr') throw new Error(`database: unexpected row ${JSON.stringify(user)}`);
await prisma.$disconnect();

// The trimmed language data: French dates and lists (the one of /help) must be formatted in French.
const date = new Date(Date.UTC(2023, 3, 28)).toLocaleDateString('fr', { dateStyle: 'long', timeZone: 'UTC' });
if (date !== '28 avril 2023') throw new Error(`language data: got "${date}"`);
const list = new Intl.ListFormat('fr', { type: 'conjunction' }).format(['a', 'b', 'c']);
if (list !== 'a, b et c') throw new Error(`language data: got "${list}"`);

// Every command and event must load: a file missing from the image shows up here.
const { loadModules } = await import('/app/dist/core/client/loadModules.js');
const commands = await loadModules('commands');
const events = await loadModules('events');
if (!commands.length || !events.length) throw new Error('no command or event was loaded');

console.log(`database, language data, ${commands.length} commands and ${events.length} events: ok`);
