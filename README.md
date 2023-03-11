# Banki

## Anleitung zur Entwicklung mit Banki
- config.js:
<br/>-- mongodb:27017 zu localhost:27017 ändern (vor Pull Request wieder rückgängig machen)
- im Hauptordner in Terminal ausführen:
<br/>-- docker compose up --detach
<br/>-- Das startet ein Docker compose mit node und MongoDB.
<br/>-- In Docker Dashboard den Node Container stoppen.
- um Node.js zu aktivieren, im Terminal:
<br/>-- cd node
<br/>-- node index.js
- auf Startseite von Banki im Browser zugreifen mit folgender URL: localhost:8080

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
