import type { en } from './en.ts';

/** French strings. */
export const fr: typeof en = {
  'lang.name': 'Français',

  'error.generic': 'Une erreur inattendue est survenue. Réessayez plus tard.',
  'error.unknownCommand': "Cette commande n'existe plus.",
  'error.notInitialised':
    "Tsuyomi n'est pas encore initialisé sur ce serveur. Un gestionnaire du serveur doit d'abord exécuter `/init`.",
  'error.guildOnly': 'Cette commande ne peut être utilisée que sur un serveur.',
  'error.serviceUnavailable': '{service} ne répond pas pour le moment. Réessayez dans un instant.',
  'error.rateLimited': 'Trop de requêtes ont été envoyées à {service}. Réessayez dans une minute.',

  'footer.anilist': "Recherche effectuée avec l'API d'AniList",
  'footer.credit': 'Bot créé par {author}',

  'init.success': 'Ce serveur est maintenant initialisé. Tsuyomi est prêt à être utilisé ici !',

  'help.title': 'Tsuyomi — Aide',
  'help.intro':
    "Tsuyomi recherche sur AniList et partage vos profils {platforms}.\n\nDans les commandes ci-dessous, `<argument>` est obligatoire et `[argument]` est facultatif. `a|b` signifie qu'il faut en choisir un.",
  'help.init':
    "Initialise Tsuyomi sur le serveur : tant que ce n'est pas fait, les autres commandes y sont refusées. Réservée aux membres ayant la permission « Gérer le serveur », et inutile en conversation privée.",
  'help.search':
    "Recherche sur AniList un animé, un manga, un light novel, un personnage ou un membre du staff. `query` est un titre ou un nom, dans n'importe quelle langue, avec ou sans accents. Vous êtes la seule personne à voir la liste des résultats : choisissez-en un dans le menu, puis appuyez sur **{validate}** pour publier sa fiche pour tout le monde.",
  'help.config':
    "`lang` choisit la langue dans laquelle Tsuyomi vous répond : anglais, français, ou celle par défaut (l'anglais). Les autres sous-commandes lient votre profil sur un site : `username` est votre pseudo sur ce site. Sans pseudo, le profil est dissocié.",
  'help.profile': 'Partage dans le salon le profil que vous avez lié avec `/config`.',
  'help.help': 'Affiche ce message. Vous êtes la seule personne à le voir.',
  'help.support.title': 'Un problème ?',
  'help.support.text':
    "Ouvrez une issue sur [GitHub]({url}), ou contactez l'autrice du bot sur Discord : **{contact}**.",

  'type.anime': 'Animé',
  'type.manga': 'Manga',
  'type.novel': 'Light novel',
  'type.character': 'Personnage',
  'type.staff': 'Staff',

  'search.title': '{type} — résultats pour « {query} »',
  'search.footer': 'Page {page}/{pages} • {count} résultats',
  'search.noResults': 'Aucun résultat de type {type} trouvé pour **{query}**.',
  'search.select': 'Choisissez un résultat, puis validez',
  'search.delete': 'Supprimer',
  'search.validate': 'Valider',
  'search.expired': 'Cette recherche a expiré. Relancez-la.',

  'field.titles': 'Titres',
  'field.synonyms': 'Synonymes',
  'field.names': 'Noms',
  'field.format': 'Format',
  'field.status': 'Statut',
  'field.episodes': 'Épisodes',
  'field.duration': "Durée d'un épisode",
  'field.chapters': 'Chapitres',
  'field.volumes': 'Tomes',
  'field.startDate': 'Date de début',
  'field.endDate': 'Date de fin',
  'field.season': 'Saison',
  'field.score': 'Note moyenne',
  'field.genres': 'Genres',
  'field.studios': 'Studios',
  'field.birthday': 'Date de naissance',
  'field.death': 'Date de décès',
  'field.age': 'Âge',
  'field.gender': 'Genre',
  'field.bloodType': 'Groupe sanguin',
  'field.homeTown': "Ville d'origine",
  'field.occupations': 'Métiers',
  'field.yearsActive': "Années d'activité",
  'field.language': 'Langue',
  'field.appearsIn': 'Apparaît dans',
  'field.knownFor': 'Connu(e) pour',

  'title.romaji': 'Romaji',
  'title.english': 'Anglais',

  'name.first': 'Prénom',
  'name.middle': 'Deuxième prénom',
  'name.last': 'Nom',
  'name.native': 'Natif',
  'name.alternative': 'Alternatif',

  'value.minutes': '{count} min',
  'value.present': "aujourd'hui",

  'format.TV': 'Série TV',
  'format.TV_SHORT': 'Série courte',
  'format.MOVIE': 'Film',
  'format.SPECIAL': 'Épisode spécial',
  'format.OVA': 'OAV',
  'format.ONA': 'ONA',
  'format.MUSIC': 'Clip musical',
  'format.MANGA': 'Manga',
  'format.NOVEL': 'Light novel',
  'format.ONE_SHOT': 'One-shot',

  'status.FINISHED': 'Terminé',
  'status.RELEASING': 'En cours',
  'status.NOT_YET_RELEASED': 'À venir',
  'status.CANCELLED': 'Annulé',
  'status.HIATUS': 'En pause',

  'season.WINTER': 'Hiver',
  'season.SPRING': 'Printemps',
  'season.SUMMER': 'Été',
  'season.FALL': 'Automne',

  'config.lang.success': 'Tsuyomi vous parlera désormais en français.',
  'config.lang.default': 'Tsuyomi vous parlera désormais dans sa langue par défaut, le français.',
  'config.profile.set': 'Votre profil {platform} est maintenant **{username}**.',
  'config.profile.removed': 'Votre profil {platform} a été dissocié.',
  'config.invalidUsername': "**{username}** n'est pas un pseudo {platform} valide.",
  'config.userNotFound': "Aucun utilisateur {platform} nommé **{username}** n'a été trouvé.",

  'profile.notConfigured':
    "Vous n'avez pas encore lié de profil {platform}. Définissez-le d'abord avec `/config {command}`.",
  'profile.share': '{user} partage son profil **{platform}**.',
  'profile.open': 'Ouvrir le profil',
  'profile.animeList': "Liste d'animés",
  'profile.mangaList': 'Liste de mangas',
  'profile.collection': 'Collection',
  'profile.anime': 'Animés',
  'profile.manga': 'Mangas',
  'profile.animeStats':
    '**{count}** titres\n**{episodes}** épisodes\n**{days}** jours de visionnage\nNote moyenne : **{score}**',
  'profile.mangaStats':
    '**{count}** titres\n**{chapters}** chapitres\n**{volumes}** tomes\nNote moyenne : **{score}**',
  'profile.favouriteAnime': 'Animés favoris',
  'profile.favouriteManga': 'Mangas favoris',
  'profile.favouriteCharacters': 'Personnages favoris',
  'profile.memberSince': 'Membre depuis le {date}',
};
