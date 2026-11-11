import type { InteractionEditReplyOptions } from 'discord.js';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import type { SearchState } from '../model/SearchState.ts';
import type { SearchEntry } from '../model/types.ts';
import { createSearchPage } from './createSearchPage.ts';
import { searchControls } from './searchControls.ts';
import { searchListEmbed } from './searchListEmbed.ts';

/** Builds the whole search message (result list and controls) for the page held by `state`. */
export function renderSearchPage(
  state: SearchState,
  entries: SearchEntry[],
  t: Translator,
): InteractionEditReplyOptions {
  const page = createSearchPage(state, entries, t);
  return { embeds: [searchListEmbed(page, t)], components: searchControls(page, t) };
}
