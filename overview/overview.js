const backend_host = 'https://h2992036.stratoserver.net';
updateStacklist();
//.....Model

function setStacks(stacks) {
    localStorage.setItem("stacks", JSON.stringify(stacks));
    updateStacklist(stacks);
}

function getStacks() {
    //returns null if stacks are empty
    return JSON.parse(localStorage.getItem("stacks"));
}

//......View

async function updateStacklist() {
    const stacks = await requestStacks();
    document.getElementById("stacks").innerHTML = "";
    for (const [stackname, value] of Object.entries(stacks)) {
        let stackid = encodeURIComponent(stackname);
        const newstack = `
                    <div id="${stackid}" class="stack">
                        <button onclick="expandStack()">Übersicht</button>
                        <label>${stackname}</label>
                        <button onclick="createCard(${stackid})">Bearbeiten</button>
                        <button onclick="createModal('${stackid}', 'str', 'Neuen Stapelnamen eingeben:', [renameStack, 'undefined'])">Umbenennen</button>
                        <button onclick="createModal('${stackid}', 'yn', 'Sicher, dass du den Stapel löschen möchtest?', [deleteStack, 'undefined'])">Löschen</button>
                    </div>
                    `;
        const innerstacks = document.getElementById("stacks").innerHTML;
        document.getElementById("stacks").innerHTML = newstack + innerstacks;
    }
}

function screenSize() {
    console.info(`${screen.width} x ${screen.height}`);
    const header = document.getElementById("headerRight");
    const overviewCont = document.getElementById("overview");
    if (screen.width >= 375 && screen.width <= 414) {
        overviewCont.style.cssText += "margin-left: -6em; margin-top: -7em; width: 21em;";
        header.style.cssText += "float:none; display:flex; justify-content: center;";
    }
    else if (screen.width >= 415 && screen.width <= 540) {
        overviewCont.style.cssText += "margin-left: -9em; margin-top: -7em; width: 31em;";
        header.style.cssText += "float:none; display:flex; justify-content: center; margin-top:1em;";
    }
    else if (screen.width >= 768 && screen.width <= 820) {
        overviewCont.style.cssText += "margin-left: -13em; margin-top: -14em; width: 44em;";
        header.style.cssText += "margin: -3em;";
    }
}

//.......Controller

async function createStack(stackname) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"sessionid":"' + getSessionid() + '","stackname":"' + stackname + '"}'
    };


    try {
        let response = await fetch(`${backend_host}/api/stacks/create`, options);
        response = response.json();
        if (response.err) throw new Error(response.err);
        let stackid = encodeURIComponent(stackname);
        if (stackname) {
            updateStacklist()
        }
    } catch (e) {
        createModal(null, 'err', e.message, [null]);
    }
}

function createCard(el) {
    const stackid = el.id;
    window.open(`/karten/createcard.html?stackid=${stackid}`, '_self');
}

function renameStack(newstackname, stackid) {
    const oldStackname = document.getElementById(stackid).getElementsByTagName("label")[0].innerHTML;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"sessionid":"' + getSessionid() + '","oldStackname":"' + oldStackname + '","newStackname":"' + newstackname + '"}'
    };

    fetch(`${backend_host}/api/stacks/rename`, options)
        .then(response => response.json())
        .then(function (response) {
            if (response.err) {
                createModal(null, 'err', response.err, [null]);
            } else {
                updateStacklist()
            }
        })
        .catch(err => createModal(null, 'err', err.message, [null]));
}

function deleteStack(ignore, stackid) {
    const stackname = document.getElementById(stackid).getElementsByTagName("label")[0].innerText;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"sessionid":"' + getSessionid() + '","stackname":"' + stackname + '"}'
    };

    fetch(`${backend_host}/api/stacks/delete`, options)
        .then(response => response.json())
        .then(function (response) {
            if (response.err) {
                createModal(null, 'err', response.err, [null]);
            } else {
                updateStacklist()
            }
        })
        .catch(err => createModal(null, 'err', err.message, [null]));
}

async function requestStacks() {
    return new Promise(function (resolve, reject) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"sessionid":"' + getSessionid() + '"}'
        };

        fetch(`${backend_host}/api/stacks/getAll`, options)
            .then(response => response.json())
            .then(function (response) {
                if (response.err) {
                    reject(new Error(response.err));
                }
                resolve(response);
            })
            .catch(err => reject(err));
    });

}

function logout() {
    setSessionid("");
    window.open('/login/login.html', '_self');
}




