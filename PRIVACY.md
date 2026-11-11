# Privacy Policy

Last updated: 12 November 2026

This policy explains what Tsuyomi ("the bot"), a Discord bot made and operated by Yatsuu ("the author"), does with data. The bot is a personal, non-commercial project.

## Summary

- The bot stores only what you give it through its commands: your language and the usernames of the profiles you link.
- It never reads messages, member lists or anything else on a server.
- It sells nothing, shows no advertising and runs no analytics.

## Data the bot stores

| Data                                                         | When                                          | Why                                          |
| ------------------------------------------------------------ | --------------------------------------------- | -------------------------------------------- |
| Your Discord user ID                                         | The first time you use `/config`              | To find your settings again                  |
| The language you chose                                       | `/config lang`                                | To answer you in that language               |
| Your AniList, MyAnimeList and Mangacollec usernames          | `/config` followed by the name of the website | To share the profile when you run `/profile` |
| The ID of a server, the Discord user ID of its owner, a date | When a server manager runs `/init`            | To know the bot was set up on the server     |

Nothing else is written to the database. It is a single file kept on a server operated by the author, of which the author may keep backup copies.

## Data the bot handles without storing it

- **Search queries.** The text you type in `/search` is sent to AniList to get the results. The results are kept in memory for 15 minutes, without any link to you, so that browsing the pages does not repeat the request. The query is also carried by the buttons of the result list, in a message only you can see.
- **Interactions.** Discord sends the bot the commands you run and the buttons you press, with your user ID and display name, so that it can answer. This is not recorded.
- **Error logs.** When something fails unexpectedly, technical details of the failure are written to log files limited to 15 MB, the oldest lines being overwritten. They can incidentally contain the content of the request that failed.

The bot does not have access to the content of messages and does not request any privileged data from Discord.

## What is sent to other services

- **AniList** receives your search queries and, when you link or share an AniList profile, the AniList username you gave. It never receives your Discord identity: the requests come from the server of the bot. See the [terms and privacy policy of AniList](https://anilist.co/terms).
- **MyAnimeList and Mangacollec** receive nothing from the bot: these profiles are shared as links built from your username.
- **Discord** carries everything the bot sends and receives. See the [Discord privacy policy](https://discord.com/privacy).

No data is sold, rented or given to anyone else.

## What becomes public

`/profile` posts your linked profile in the channel where you run it, for everyone there to see, along with your Discord display name and avatar. A sheet validated after a `/search` is public too. Everything else the bot answers is visible only to you.

## How long data is kept

Your settings are kept until you remove them or ask for their removal. The record of a server is kept until its removal is asked for, including after the bot has left the server.

## Your choices and rights

- **Unlink a profile:** run `/config anilist`, `/config myanimelist` or `/config mangacollec` without a username.
- **Delete everything about you, or the record of your server:** ask the author (see [Contact](#contact)). You only need to give your Discord user ID or the server ID.
- **Know what is stored about you, or have it corrected:** ask the author as well.

If the General Data Protection Regulation applies to you, these are your rights of access, rectification, erasure and objection, and you may also lodge a complaint with your data protection authority. The author handles this data because it is needed to provide the features you ask for.

## Children

The bot is meant for people old enough to use Discord under [Discord's Terms of Service](https://discord.com/terms). It does not knowingly collect data from anyone younger.

## Changes

This policy may change when the bot does. The date at the top tells when it last did, and the history of this file shows what changed.

## Contact

- Discord: `yatsuu`
- GitHub: open an issue on <https://github.com/yatsuuw/tsuyomi-discord>
