import {
  type APIApplicationCommandOption,
  ApplicationCommandOptionType,
  type RESTPostAPIChatInputApplicationCommandsJSONBody,
} from 'discord.js';

/** Prints the arguments of a command or subcommand: `<required>` or `[optional]`. */
function formatArguments(options: APIApplicationCommandOption[] = []): string {
  return options.map(({ name, required }) => (required ? ` <${name}>` : ` [${name}]`)).join('');
}

/**
 * Lists the ways of writing a command, e.g. `/search anime|manga <query>`, from the definition pushed to
 * Discord: the help can never disagree with what Discord offers. Subcommands taking the same arguments
 * share a line.
 */
export function commandUsages({
  name,
  options = [],
}: RESTPostAPIChatInputApplicationCommandsJSONBody): string[] {
  const subcommands = options.flatMap((option) =>
    option.type === ApplicationCommandOptionType.Subcommand ? [option] : [],
  );
  if (!subcommands.length) return [`/${name}${formatArguments(options)}`];

  const namesByArguments = new Map<string, string[]>();
  for (const subcommand of subcommands) {
    const args = formatArguments(subcommand.options);
    namesByArguments.set(args, [...(namesByArguments.get(args) ?? []), subcommand.name]);
  }
  return [...namesByArguments].map(([args, names]) => `/${name} ${names.join('|')}${args}`);
}
