import { createCommand } from '../core/builders/createCommand.ts';
import type { Command } from '../core/types/Command.ts';
import { getPlatform } from '../features/profiles/platforms/index.ts';
import { linkedUsername } from '../features/profiles/share/linkedUsername.ts';
import { addPlatformSubcommands } from '../features/profiles/subcommands/addPlatformSubcommands.ts';
import { attachEmbedImages } from '../utils/discord/attachEmbedImages.ts';
import { sendWithLinksIfRefused } from '../utils/discord/sendWithLinksIfRefused.ts';

const data = createCommand('profile', 'Share a profile: yours, or the one another user linked');
addPlatformSubcommands(data, (subcommand, { name }) =>
  subcommand
    .setDescription(`Share a ${name} profile`)
    .addUserOption((option) =>
      option.setName('user').setDescription(`Whose ${name} profile to share (yours when left empty)`),
    ),
);

/** /profile — posts an embed sharing a profile linked with /config: the user's own, or another user's. */
const profile: Command = {
  data: data.toJSON(),

  async execute(interaction, { t, user }) {
    const { key, platform } = getPlatform(interaction.options.getSubcommand());
    const sharedBy = interaction.user;
    const share = { owner: interaction.options.getUser('user') ?? sharedBy, sharedBy };
    const username = await linkedUsername(key, share, user);

    await interaction.deferReply();
    const withLinks = await platform.render(username, share, t);
    // The pictures of the profile are sent as files whenever possible, and stay links otherwise.
    const withFiles = await attachEmbedImages(withLinks);
    await sendWithLinksIfRefused(withFiles, withLinks, (message) => interaction.editReply(message));
  },
};

export default profile;
