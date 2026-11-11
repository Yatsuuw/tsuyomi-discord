import { createCommand } from '../core/builders/createCommand.ts';
import { UserError } from '../core/errors/UserError.ts';
import type { Command } from '../core/types/Command.ts';
import { getPlatform, platforms } from '../features/profiles/platforms/index.ts';

const data = createCommand('profile', 'Share one of your profiles');
for (const [key, { name }] of Object.entries(platforms)) {
  data.addSubcommand((subcommand) => subcommand.setName(key).setDescription(`Share your ${name} profile`));
}

/** /profile — posts an embed sharing the profile the user linked with /config. */
const profile: Command = {
  data: data.toJSON(),

  async execute(interaction, { t, user }) {
    const { key, platform } = getPlatform(interaction.options.getSubcommand());
    const username = user?.[key];
    if (!username) throw new UserError('profile.notConfigured', { platform: platform.name, command: key });

    await interaction.deferReply();
    await interaction.editReply(await platform.render(username, interaction.user, t));
  },
};

export default profile;
