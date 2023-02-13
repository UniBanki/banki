# Banki
## Backend API https://h2992036.stratoserver.net
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
