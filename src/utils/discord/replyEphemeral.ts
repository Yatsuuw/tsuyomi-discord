import { MessageFlags, type RepliableInteraction } from 'discord.js';

/** Sends a message only its recipient can see, whatever the current state of the interaction. */
export async function replyEphemeral(interaction: RepliableInteraction, content: string): Promise<void> {
  const message = { content, flags: MessageFlags.Ephemeral } as const;
  if (!interaction.deferred && !interaction.replied) {
    await interaction.reply(message);
    return;
  }

  // A deferred command shows a "thinking..." placeholder until its reply is edited.
  const pending = !interaction.replied && !interaction.isMessageComponent();
  if (pending && interaction.ephemeral) {
    await interaction.editReply({ content });
    return;
  }
  // A public placeholder cannot become ephemeral: remove it, then follow up privately.
  if (pending) await interaction.deleteReply();
  await interaction.followUp(message);
}
