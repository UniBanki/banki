# Banki [![Build](https://github.com/UniBanki/banki/actions/workflows/docker-image.yml/badge.svg)](https://github.com/UniBanki/banki/actions/workflows/docker-image.yml)

## Anleitung zum produktivem Deployment von Banki
Voraussetzung: Docker ist installiert und Docker Agent läuft.
Terminal im Ordner öffnen, wo Banki deployed werden soll:
- git clone https://github.com/UniBanki/banki.git
- cd banki
- docker compose up --detach
Auf Banki kann nun mit localhost:8080 zugegriffen werden.

## Anleitung zur Entwicklung mit Banki
Voraussetzung: Docker ist installiert und Docker Agent läuft.
Terminal im Ordner öffnen, wo Banki deployed werden soll:
- docker run -p 27017:27017/tcp -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=passwort -e MONGO_INITDB_DATABASE=banki -d mongo:6.0.4
- cd node
- node index.js
Auf Banki kann nun mit localhost:8080 zugegriffen werden.

## Backend API http://h2992036.stratoserver.net
Im folgenden sind nur die erfolgreichen API-Responses beschrieben. Bei Fehlern werden Fehlernachrichten in Textform geschickt.

**/api/register** [POST]<br/>
req: username, password<br/>
res: sessionid<br/>

**/api/login** [POST]<br/>
req: username, password<br/>
res: sessionid

**/api/stacks/get** [POST]<br/>
req: sessionid<br/>
res: stacks

**/api/stacks/set** [POST]<br/>
req: sessionid, stacks<br/>
res: stacks
