# Security Policy

Tsuyomi is a personal project maintained by Yatsuu. This page explains how to report a security problem in it.

## Supported versions

Only the latest version is supported: the code on the `master` branch, which is the one the public bot runs. Fixes are not ported to older versions.

## Reporting a vulnerability

**Do not open a public issue for a security problem**: it would be visible to everyone before a fix exists. Report it privately instead:

- Email: <yatsuuw@proton.me>
- Discord: `yatsuu`

Please include:

- what the problem is and what it allows someone to do;
- the steps to reproduce it, or a proof of concept;
- the command, file or version concerned, if you know it.

You will get an answer as soon as possible; this is a project maintained on free time, so it can take a few days. Once the problem is confirmed, it is fixed in priority and you are told when the fix is live. You are welcome to be credited for the report, or to stay anonymous.

## Scope

In scope:

- the code of this repository and the Docker images built from it;
- the public Tsuyomi bot, including the data it stores (see the [Privacy Policy](PRIVACY.md)).

Out of scope:

- Discord, AniList, MyAnimeList and Mangacollec themselves: report problems in these services to their owners;
- a vulnerability in a dependency that cannot be exploited through the bot. Dependencies are watched and updated automatically.

## Testing

Test on your own copy of the bot whenever you can. If you test the public bot, do not try to read, change or delete the data of other users or servers, and do not disrupt it for others (no flooding, no denial of service).

There is no bug bounty.
