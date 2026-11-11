/** English strings. This file is the reference: its keys define what every other locale must provide. */
export const en = {
  'lang.name': 'English',

  'error.generic': 'An unexpected error occurred. Please try again later.',
  'error.unknownCommand': 'This command no longer exists.',
  'error.notInitialised':
    'Tsuyomi is not initialised on this server yet. A server manager must run `/init setup` first.',
  'error.guildOnly': 'This command can only be used on a server.',
  'error.serviceUnavailable': '{service} is not responding right now. Please try again in a moment.',
  'error.rateLimited': 'Too many requests were sent to {service}. Please try again in a minute.',

  'footer.anilist': 'Search powered by the AniList API',
  'footer.credit': 'Bot made by {author}',

  'init.success': 'This server is now initialised. Tsuyomi is ready to be used here!',
  'init.removed':
    'Everything Tsuyomi saved about this server has been deleted. Its commands will not work here until `/init setup` is run again.',

  'help.title': 'Tsuyomi — Help',
  'help.intro':
    'Tsuyomi searches AniList and shares your {platforms} profiles.\n\nIn the commands below, `<argument>` is required and `[argument]` is optional. `a|b` means you choose one of them.',
  'help.init':
    '`setup` initialises Tsuyomi on the server: until this is done, the other commands are refused there. `remove` deletes what Tsuyomi saved about the server (its ID and the ID of its owner), after which it has to be set up again. Reserved to members with the "Manage Server" permission, and not needed in private conversations.',
  'help.search':
    'Searches AniList for an anime, a manga, a light novel, a character or a staff member. `query` is a title or a name, in any language, with or without accents. You are the only one to see the list of results: choose one in the menu, then press **{validate}** to post its sheet for everyone.',
  'help.config':
    '`lang` sets the language Tsuyomi answers you in: English, French, or the default one (English). The other subcommands link your profile on a website: `username` is your username there. Leave it out to unlink the profile. `delete` erases everything Tsuyomi saved about you.',
  'help.profile':
    'Shares, in the channel, the profile you linked with `/config`. With `user`, shares the profile that person linked instead.',
  'help.help': 'Shows this message. You are the only one to see it.',
  'help.support.title': 'A problem?',
  'help.support.text':
    'Open an issue on [GitHub]({url}), or contact the author of the bot on Discord: **{contact}**.',

  'type.anime': 'Anime',
  'type.manga': 'Manga',
  'type.novel': 'Light novel',
  'type.character': 'Character',
  'type.staff': 'Staff',

  'search.title': '{type} — results for "{query}"',
  'search.footer': 'Page {page}/{pages} • {count} results',
  'search.noResults': 'No {type} result was found for **{query}**.',
  'search.select': 'Choose a result, then validate',
  'search.delete': 'Delete',
  'search.validate': 'Validate',
  'search.expired': 'This search has expired. Please run it again.',

  'field.titles': 'Titles',
  'field.synonyms': 'Synonyms',
  'field.names': 'Names',
  'field.format': 'Format',
  'field.status': 'Status',
  'field.episodes': 'Episodes',
  'field.duration': 'Episode length',
  'field.chapters': 'Chapters',
  'field.volumes': 'Volumes',
  'field.startDate': 'Start date',
  'field.endDate': 'End date',
  'field.season': 'Season',
  'field.score': 'Mean score',
  'field.genres': 'Genres',
  'field.studios': 'Studios',
  'field.birthday': 'Date of birth',
  'field.death': 'Date of death',
  'field.age': 'Age',
  'field.gender': 'Gender',
  'field.bloodType': 'Blood type',
  'field.homeTown': 'Home town',
  'field.occupations': 'Occupations',
  'field.yearsActive': 'Years active',
  'field.language': 'Language',
  'field.appearsIn': 'Appears in',
  'field.knownFor': 'Known for',

  'title.romaji': 'Romaji',
  'title.english': 'English',

  'name.first': 'First name',
  'name.middle': 'Middle name',
  'name.last': 'Last name',
  'name.native': 'Native',
  'name.alternative': 'Alternative',

  'value.minutes': '{count} min',
  'value.present': 'present',

  'format.TV': 'TV',
  'format.TV_SHORT': 'TV short',
  'format.MOVIE': 'Movie',
  'format.SPECIAL': 'Special',
  'format.OVA': 'OVA',
  'format.ONA': 'ONA',
  'format.MUSIC': 'Music',
  'format.MANGA': 'Manga',
  'format.NOVEL': 'Light novel',
  'format.ONE_SHOT': 'One-shot',

  'status.FINISHED': 'Finished',
  'status.RELEASING': 'Releasing',
  'status.NOT_YET_RELEASED': 'Not yet released',
  'status.CANCELLED': 'Cancelled',
  'status.HIATUS': 'On hiatus',

  'season.WINTER': 'Winter',
  'season.SPRING': 'Spring',
  'season.SUMMER': 'Summer',
  'season.FALL': 'Fall',

  'config.lang.success': 'Tsuyomi will now talk to you in English.',
  'config.lang.default': 'Tsuyomi will now talk to you in its default language, English.',
  'config.deleted': 'Everything Tsuyomi saved about you has been deleted.',
  'config.profile.set': 'Your {platform} profile is now **{username}**.',
  'config.profile.removed': 'Your {platform} profile has been unlinked.',
  'config.invalidUsername': '**{username}** is not a valid {platform} username.',
  'config.userNotFound': 'No {platform} user named **{username}** was found.',

  'profile.notConfigured':
    'You have not linked a {platform} profile yet. Set it with `/config {command}` first.',
  'profile.notLinked': '{user} has not linked a {platform} profile.',
  'profile.share': '{user} shares their **{platform}** profile.',
  'profile.shareOther': '{sharer} shares the **{platform}** profile of {user}.',
  'profile.open': 'Open the profile',
  'profile.animeList': 'Anime list',
  'profile.mangaList': 'Manga list',
  'profile.collection': 'Collection',
  'profile.anime': 'Anime',
  'profile.manga': 'Manga',
  'profile.animeStats':
    '**{count}** titles\n**{episodes}** episodes\n**{days}** days watched\nMean score: **{score}**',
  'profile.mangaStats':
    '**{count}** titles\n**{chapters}** chapters\n**{volumes}** volumes\nMean score: **{score}**',
  'profile.favouriteAnime': 'Favourite anime',
  'profile.favouriteManga': 'Favourite manga',
  'profile.favouriteCharacters': 'Favourite characters',
  'profile.memberSince': 'Member since {date}',
};
