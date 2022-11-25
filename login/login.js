function getCookie(cookieName) {//ignores attributes from cookies, returns only the value
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}


function login(username, password) {
    const old_sessionid = getCookie("sessionid");
    const user = {"username": username, "password": password, "sessionid": old_sessionid};
    let loggedin = false;
    let error = null;

    fetch('https://h2992036.stratoserver.net/banki/login.php', {
        method: 'POST', mode: 'cors', cache: 'no-cache', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((response) => {
            const new_sessionid = response.sessionid;
            if (new_sessionid !== undefined && old_sessionid !== new_sessionid) {
                document.cookie = "sessionid=" + new_sessionid + "; path=/; SameSite=None; Secure";
                loggedin = true;
            } else {
                //expected server error
                error=response.error;
            }

        })
        .then(() => {
            if(error===null && loggedin===true){
                window.open('../overview/overview.html', '_self');
            }else {
                //show expected error to user based on response.error
                console.log(error);
            }
        })
        .catch(() => {
            //unexpected server error
        });

}

function handelEnter(e){
    if (e.keyCode === 13){
        var username =$('#username').val()
        var password =$('#password').val()
        login(username,password)
    }
}

function register(username, password) {
    const user = {"username": username, "password": password};

    fetch('https://h2992036.stratoserver.net/banki/register.php', {
        method: 'POST', mode: 'cors', cache: 'no-cache', headers: {
            'Content-Type': 'application/json',
        }, body: JSON.stringify(user),
    })
        .then((response) => response.json())
        .then((user) => {
            console.log('Success:', user);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
}
