const backend_host = 'https://h2992036.stratoserver.net';

function screenSize() {
    console.info(`${screen.width} x ${screen.height}`);
    const logo = document.getElementById("logo_cont");
    const cloudImg = document.getElementById("textblock");
    const cloudCont = document.getElementById("content_text");
    const logoImg = document.getElementById("logo_img");
    const linkCont = document.getElementById("links");
    const buttonLog = document.getElementById("to_login");

    if (screen.width >= 375 && screen.width < 414) {
        logo.style.cssText += "max-width: 100%; padding-top: 6em; margin-left: 0em;";
        cloudImg.style.cssText += "max-width: 37%; margin-top: -7em; background-size: 805px; font-size:10pt; ";
        cloudCont.style.cssText += "margin-top: 3em; width: 140%; padding: 0;";
        buttonLog.style.cssText += "font-size: 10pt;";
    } else if (screen.width >= 414 && screen.width <= 540) {
        logo.style.cssText += "max-width: 100%; padding-top: 6em; margin-left: 0em;";
        buttonLog.style.cssText += "font-size: 10pt;";
        cloudImg.style.cssText += "max-width: 40%; margin-top: -5em; background-size: 805px; font-size:10pt; ";
        cloudCont.style.cssText += "margin-top: 3em; width: 140%; padding: 0;";
    } else if (screen.width >= 768 && screen.width <= 1024) {
        cloudImg.style.cssText += "margin: -3em; width: 63vw;";
    } else if (screen.width >= 1400 && screen.width <= 1900) {
        logo.style.cssText += "margin: -2em;";
        cloudImg.style.cssText += "margin: -6em;";
        cloudCont.style.cssText += "margin: 1em;";
    }
}


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