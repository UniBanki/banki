# Banki [![Build](https://github.com/UniBanki/banki/actions/workflows/docker-image.yml/badge.svg)](https://github.com/UniBanki/banki/actions/workflows/docker-image.yml)

## Produktives Deployment von Banki
Voraussetzungen: Docker installiert, Docker Agent läuft, docker compose installiert
<br/>Zusätzlich für Windows Nutzer: in Docker experimentelle Features erlauben
```bash
git clone https://github.com/UniBanki/banki.git
cd banki
docker compose up -d
```
Zugriff auf Banki über http://localhost
## Updaten von Banki
```bash
docker compose stop
docker compose pull   
docker compose up -d
```

## Anleitung zur Entwicklung mit Banki
Voraussetzung: Docker ist installiert und Docker Agent läuft.
```bash
git clone https://github.com/UniBanki/banki.git
cd banki
docker run -p 27017:27017/tcp -e MONGO_INITDB_ROOT_USERNAME=root -e MONGO_INITDB_ROOT_PASSWORD=passwort -e MONGO_INITDB_DATABASE=banki -d mongo:6.0.4
cd node
npm install
node index.js
```
Zugriff auf Banki über http://localhost

## Backend API
Im folgenden sind nur die erfolgreichen API-Responses beschrieben. Bei Fehlern werden Fehlernachrichten in Textform geschickt.

**/api/register** [POST]<br/>
req: username, password<br/>
res: 200

**/api/login** [POST]<br/>
req: username, password<br/>
res: 200

**/api/stacks/get** [GET]<br/>
req: sessionid<br/>
res: stacks

**/api/stacks/set** [POST]<br/>
req: sessionid, stacks<br/>
res: stacks
