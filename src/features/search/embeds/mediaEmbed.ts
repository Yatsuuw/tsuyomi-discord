import type { EmbedBuilder } from 'discord.js';
import type { Translator } from '../../../i18n/translator/createTranslator.ts';
import { formatFuzzyDate } from '../../../services/anilist/format/formatFuzzyDate.ts';
import { mediaTitle } from '../../../services/anilist/format/mediaTitle.ts';
import type { Media } from '../../../services/anilist/model/types.ts';
import { labelledLines } from '../../../utils/text/labelledLines.ts';
import { sheetEmbed } from './sheetEmbed.ts';

/** Detailed sheet of an anime, a manga or a light novel. */
export function mediaEmbed(media: Media, t: Translator): EmbedBuilder {
  const { title, coverImage } = media;
  const titles = labelledLines([
    [t('title.romaji'), title.romaji],
    [t('title.english'), title.english],
    [t('name.native'), title.native],
  ]);
  const type = media.type === 'ANIME' ? 'type.anime' : media.format === 'NOVEL' ? 'type.novel' : 'type.manga';
  const season = media.season && `${t.label('season', media.season)} ${media.seasonYear ?? ''}`;

  return sheetEmbed(
    {
      type,
      title: mediaTitle(title),
      url: media.siteUrl,
      description: media.description,
      thumbnail: coverImage.extraLarge,
      // AniList gives the dominant colour of the cover as "#rrggbb".
      color: coverImage.color ? Number.parseInt(coverImage.color.slice(1), 16) : null,
      fields: [
        [t('field.titles'), titles, false],
        [t('field.synonyms'), media.synonyms.join(' • '), false],
        [t('field.format'), t.label('format', media.format)],
        [t('field.status'), t.label('status', media.status)],
        [t('field.score'), media.averageScore && `${media.averageScore} %`],
        [t('field.episodes'), media.episodes],
        [t('field.duration'), media.duration && t('value.minutes', { count: media.duration })],
        [t('field.chapters'), media.chapters],
        [t('field.volumes'), media.volumes],
        [t('field.startDate'), formatFuzzyDate(media.startDate, t.lang)],
        [t('field.endDate'), formatFuzzyDate(media.endDate, t.lang)],
        [t('field.season'), season],
        [t('field.studios'), media.studios.nodes.map((studio) => studio.name).join(', ')],
        [t('field.genres'), media.genres.join(', '), false],
      ],
    },
    t,
  ).setImage(media.bannerImage);
}
