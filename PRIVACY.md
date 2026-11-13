# Privacy Policy

Last updated: 12 November 2026

This policy explains what Tsuyomi ("the bot"), a Discord bot, does with data. The bot is a personal, non-commercial project.

## Who is responsible

Tsuyomi is developed and maintained by **Yatsuu** ("the author"), from France. Yatsuu is the data controller within the meaning of the General Data Protection Regulation: the person who decides what the bot does with data and who answers for it.

Contact: <yatsuuw@proton.me>

## Summary

- The bot stores only what you give it through its commands: your language, the usernames of the profiles you link, and whether you let others share them.
- It never reads messages, member lists or anything else on a server.
- It deletes what it no longer needs: your entry once you have nothing configured, the record of a server once the bot has left it.
- It sells nothing, shows no advertising and runs no analytics.

## Data the bot stores

| Data                                                | When                                          | Why                                         |
| --------------------------------------------------- | --------------------------------------------- | ------------------------------------------- |
| Your Discord user ID                                | The first time you use `/config`              | To find your settings again                 |
| The language you chose                              | `/config lang`                                | To answer you in that language              |
| Your AniList, MyAnimeList and Mangacollec usernames | `/config` followed by the name of the website | To share the profile when `/profile` is run |
| That you let other users share your profiles        | `/config sharing`, when you allow it          | To let them post your profiles              |
| The ID of a server and a date                       | When a server manager runs `/init setup`      | To know the bot was set up there            |

Nothing else is written to the database. It is a single file kept on a server operated by the author, located in France, of which the author may keep backup copies.

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

`/profile` posts a linked profile in the channel where it is run, for everyone there to see, along with the Discord display name and avatar of its owner.

- **By default, only you can post your profiles.** Nobody else can make the bot show them.
- **If you allow it with `/config sharing`**, any user of the bot who can select you (on a server you share, or in a private conversation with you) can post them too by naming you in `/profile`. You can withdraw that permission at any time with the same command.

A sheet validated after a `/search` is public too, and says who searched for it. Everything else the bot answers is visible only to you.

## How long data is kept

Data is kept for as long as the feature it serves needs it, and deleted afterwards, as both the General Data Protection Regulation and the [Discord Developer Terms of Service](https://support-dev.discord.com/hc/en-us/articles/8562894815383-Discord-Developer-Terms-of-Service) require.

- **Your settings** are kept until you remove them. As long as one of them remains (a language, a linked profile, or the permission to share), so does the entry holding your Discord user ID. Once none remains, or when you run `/config delete`, the whole entry is deleted: the bot does not keep a user ID with nothing attached to it.
- **The record of a server** (its ID and the date it was set up) is kept for as long as the bot is on the server. It is deleted when a server manager runs `/init remove`, when the bot is removed from the server or when the server is deleted; if the bot was stopped at that moment, the next time it starts.
- **Backup copies** of the database may still hold deleted data until they are replaced.

## Your choices and rights

- **Unlink a profile:** run `/config anilist`, `/config myanimelist` or `/config mangacollec` without a username.
- **Forget your language:** run `/config lang` and choose "Default".
- **Stop others from sharing your profiles:** run `/config sharing` and choose "False". This is how things are until you choose otherwise.
- **Delete everything about you:** run `/config delete`. Nothing is left, not even your user ID.
- **Delete the record of your server:** run `/init remove`, or remove the bot from the server.
- **Know what is stored about you, have it corrected, or have it deleted for you:** ask the author (see [Contact](#contact)), giving your Discord user ID or the server ID.

These are your rights of access, rectification, erasure and objection under the General Data Protection Regulation, which applies to the bot. You may also lodge a complaint with a data protection authority: the [CNIL](https://www.cnil.fr) in France, or the one of the country where you live. The author handles this data because it is needed to provide the features you ask for.

## Children

The bot is meant for people old enough to use Discord under [Discord's Terms of Service](https://discord.com/terms). It does not knowingly collect data from anyone younger.

## Changes

This policy may change when the bot does. The date at the top tells when it last did, and the history of this file shows what changed.

## Contact

Yatsuu, developer and maintainer of the bot, data controller:

- Email: <yatsuuw@proton.me>
- Discord: `yatsuu`
- GitHub: open an issue on <https://github.com/yatsuuw/tsuyomi-discord>
