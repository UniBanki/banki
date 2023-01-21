

# Banki
### Anforderungen an Nutzerdaten
Nutzername:
- mögliche Zeichen: A-Z, a-z, 0-9, ., _
- 5-20 Zeichen lang
- kein . oder _ am Anfang
- kein __, _., ._ oder .. im Namen
- kein . oder _ am Ende

Passwort:
- mögliche Zeichen: A-Z, a-z, 0-9, ._@$!%*#?&
- 5-20 Zeichen lang
## Backend API h2992036.stratoserver.net
Im folgenden sind nur die erfolgreichen API-Responses beschrieben. Bei Fehlern werden Fehlernachrichten in Textform geschickt.

**/api/register** [POST]<br/>
req: username, password<br/>
res: sessionid<br/>

**/api/login** [POST]<br/>
req: username, password<br/>
res: sessionid

**/api/checkSessionid** [POST]<br/>
req: sessionid<br/>
res: true

**/api/stacks/create** [POST]<br/>
req: stackname, sessionid<br/>
res: {}

**/api/stacks/rename** [POST]<br/>
req: oldStackname, newStackname, sessionid<br/>
res: {}

**/api/stacks/delete** [POST]<br/>
req: stackname, sessionid<br/>
res: {}

**/api/stacks/getAll** [POST]<br/>
req: sessionid<br/>
res: stacks

**/api/cards/update** [POST]<br/>
req: card, stackname, sessionid<br/>
res: cardid

**/api/cards/delete** [POST]<br/>
req: cardid, stackname, sessionid<br/>
res: {}

**/api/cards/get** [POST]<br/>
req: stackname, sessionid<br/>
res: cards
