/**
 * Commands described by /help, in the order they are presented. Each one needs a `help.<name>` string in
 * the locales: a name without it does not compile.
 */
export const HELP_COMMANDS = ['init', 'search', 'config', 'profile', 'help'] as const;

/** Where problems with the bot are reported. */
export const ISSUES_URL = 'https://github.com/yatsuuw/tsuyomi-discord/issues';

/** The two documents every user of the bot is entitled to read. */
export const PRIVACY_URL = 'https://github.com/Yatsuuw/tsuyomi-discord/blob/master/PRIVACY.md';
export const TERMS_URL = 'https://github.com/Yatsuuw/tsuyomi-discord/blob/master/TERMS.md';

/** Discord username of the author of the bot, for those who would rather write to her. */
export const AUTHOR_DISCORD = 'yatsuu';

/** Colour of the help embed (the "blurple" of Discord). */
export const HELP_COLOR = 0x5865f2;
