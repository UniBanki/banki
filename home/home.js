const backend_host = 'https://h2992036.stratoserver.net';



function sessionidValid() {

    return new Promise(function (resolve, reject) {
        const sessionid = getCookie("sessionid");

        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"sessionid":"' + getCookie('sessionid') + '"}'
        };

        fetch(`${backend_host}/api/checkSessionid`, options)
            .then(response => response.json())
            .then(function (response) {
                if (response === true) {
                    resolve();
                } else {
                    reject();
                }
            })
            .catch(err => reject());
    });
}

function gotoLogin() {
    sessionidValid()
        .then(window.open('/overview/overview.html', '_self'))
        .catch(window.open('/login/login.html', '_self'))
}