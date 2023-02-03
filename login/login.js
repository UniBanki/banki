const backend_host = 'https://h2992036.stratoserver.net'

function getCookie(cookieName) {//ignores attributes from cookies, returns only the values
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

function bodyload() {
    document.body.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            document.getElementById("login").click();

        };
    })
}


async function login(username, password) {
    try {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"username":"' + username + '","password":"' + password + '"}'
        };
        let response = await fetch(`${backend_host}/api/login`, options);
        response = await response.json();
        console.log(response)
        if (response.err) {
            createModal(this, 'err', response.err, []);
        } else {
            setSessionid(response.sessionid);
            window.open('/overview/overview.html', '_self');
        }
    } catch (err) {
        createModal(null, 'err', err.message);
    }
}

function register(username, password) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"username":"' + username + '","password":"' + password + '"}'
    };

    fetch(`${backend_host}/api/register`, options)
        .then(response => response.json())
        .then(response => {
            if (response.err) {
                createModal(this, 'err', response.err, [])
            } else {
                setSessionid(response.sessionid);
                window.open('/overview/overview.html', '_self');
            }
        })
        .catch(err => createModal(null, 'err', err.message));
}
