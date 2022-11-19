# kasakow.com
## Backend API https://h2992036.stratoserver.net
Es ist empfohlen, wenn implementiert, im Frontend nur die ersten zwei Charakter der Server-Antwort zu interpretieren, da sich die Beschreibung der Antwort ändern. 
### /login.php
| Fall | Antwort |
|--|--|
| *Username und Passwort existiert* | li-Logged in |
| *Username existiert nicht* | ne-User doesnt exist |
| *Password stimmt nicht* | pw-Password is wrong |

### /register.php 
| Fall | Antwort |
|--|--|
| *Nutzer registriert* | us-User created |
| *Nutzer existiert bereits* | ue-User already exists |
| *Username invalid* | ui-Username is invalid |
| *Password invalid* | pi-Password is invalid |
