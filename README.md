
# kasakow.com
## Nutzerhandbuch
### Anforderungen an Credentials
Username:
- mögliche Zeichen: A-Z, a-z, 0-9, ., _
- 5-20 Zeichen lang
- kein . oder _ am Anfang
- kein __, _., ._ oder .. im Namen
- kein . oder _ am Ende

Passwort:
- mögliche Zeichen: A-Z, a-z, 0-9, ._@$!%*#?&
- 5-20 Zeichen lang
## Backend API https://h2992036.stratoserver.net
Es ist empfohlen, wenn implementiert, im Frontend nur die ersten zwei Charakter der Server-Antwort zu interpretieren, da sich die Beschreibung der Antwort ändern. 
### /login.php
POST mit body: {"username":<*str_user*>, "password":<*str_password*>}
| Fall | Antwort |
|--|--|
| *Username und Passwort existiert* | li-Logged in |
| *Username existiert nicht* | ne-User doesnt exist |
| *Password stimmt nicht* | pw-Password is wrong |

### /register.php 
POST mit body: {"username":<*str_user*>, "password":<*str_password*>}
| Fall | Antwort |
|--|--|
| *Nutzer registriert* | us-User created |
| *Nutzer existiert bereits* | ue-User already exists |
| *Username invalid* | ui-Username is invalid |
| *Password invalid* | pi-Password is invalid |
