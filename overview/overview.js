function onLoad() {
    getStacks()
        .then(function (stacks) {
            stacks.forEach(function (stack) {
                let stackid = encodeURIComponent(stack.stackname);

                insertStack(stackid, stack.stackname);
            })
        })
        .catch(err => createModal(null, 'err', err.message, [null]))
}

function getCookie(cookieName) {//ignores attributes from cookies, returns only the values
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}

function insertStack(stackid, stackname) {
    const newstack = `
                    <div id="${stackid}" class="stack">
                        <button onclick="expandStack()">Übersicht</button>
                        <label>${stackname}</label>
                        <button onclick="">Hinzufügen</button>
                        <button onclick="createModal('${stackid}', 'str', 'Neuen Stapelnamen eingeben:', [renameStack, 'undefined'])">Umbenennen</button>
                        <button onclick="createModal('${stackid}', 'yn', 'Sicher, dass du den Stapel löschen möchtest?', [deleteStack, 'undefined'])">Löschen</button>
                    </div>
                    `;
    const innerstacks = document.getElementById("stacks").innerHTML;
    document.getElementById("stacks").innerHTML = newstack + innerstacks;
}

function createStack(stackname) {


    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"sessionid":"' + getCookie('sessionid') + '","stackname":"' + stackname + '"}'
    };

    fetch('https://h2992036.stratoserver.net/api/stacks/create', options)
        .then(response => response.json())
        .then(function (response) {
            if (response.err) {
                createModal(null, 'err', response.err, [null]);
            } else {
                let stackid = encodeURIComponent(stackname);
                if (stackname) {
                    insertStack(stackid, stackname);
                }
            }
        })
        .catch(err => createModal(null, 'err', err.message, [null]));



}

function expandStack() {
}

function createCard() {
    window.open('../karten/createcard.html', '_self');
}

function renameStack(newstackname, stackid) {

    const oldStackname = document.getElementById(stackid).getElementsByTagName("label")[0].innerHTML;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"sessionid":"' + getCookie('sessionid') + '","oldStackname":"' + oldStackname + '","newStackname":"' + newstackname + '"}'
    };

    fetch('https://h2992036.stratoserver.net/api/stacks/rename', options)
        .then(response => response.json())
        .then(function (response) {
            if (response.err) {
                createModal(null, 'err', response.err, [null]);
            } else {
                document.getElementById(stackid).getElementsByTagName("label")[0].innerHTML = newstackname;
            }
        })
        .catch(err => createModal(null, 'err', err.message, [null]));


}

function deleteStack(ignore, stackid) {

    const stackname = document.getElementById(stackid).getElementsByTagName("label")[0].innerText;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"sessionid":"' + getCookie('sessionid') + '","stackname":"' + stackname + '"}'
    };

    fetch('https://h2992036.stratoserver.net/api/stacks/delete', options)
        .then(response => response.json())
        .then(function (response) {
            if (response.err) {
                createModal(null, 'err', response.err, [null]);
            } else {
                document.getElementById(stackid).remove();
            }
        })
        .catch(err => createModal(null, 'err', err.message, [null]));
}

function getStacks() {
    return new Promise(function (resolve, reject) {
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: '{"sessionid":"' + getCookie('sessionid') + '"}'
        };

        fetch('https://h2992036.stratoserver.net/api/stacks/getAll', options)
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

function exit() {

}





