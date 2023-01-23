const backend_host = 'https://h2992036.stratoserver.net';

function initStacks() {
    getStacks()
        .then(function (stacks) {
            for (const [key, value] of Object.entries(stacks)) {
                let stackid = encodeURIComponent(key);
                insertStack(stackid, key);
            }
        })
        .catch(err => createModal(null, 'err', err.message, [null]))
}



function insertStack(stackid, stackname) {
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

function createStack(stackname) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"sessionid":"' + getCookie('sessionid') + '","stackname":"' + stackname + '"}'
    };

    fetch(`${backend_host}/api/stacks/create`, options)
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

function screenSize(){
  console.info(`${ screen.width } × ${ screen.height }`);
  const header = document.getElementById("headerRight");
  const overviewCont = document.getElementById("overview");
  if(screen.width >= 375 && screen.width <= 414){
    overviewCont.style.cssText += "margin-left: -6em; margin-top: -7em; width: 21em;";
    header.style.cssText += "float:none; display:flex; justify-content: center;";
  }
  else if (screen.width >= 415 && screen.width <=540){
    overviewCont.style.cssText += "margin-left: -9em; margin-top: -7em; width: 31em;";
    header.style.cssText += "float:none; display:flex; justify-content: center; margin-top:1em;";
  }
  else if (screen.width >= 768 && screen.width<= 820){
    overviewCont.style.cssText += "margin-left: -13em; margin-top: -14em; width: 44em;";
    header.style.cssText += "margin: -3em;";
  }
}


function expandStack() {
}

function createCard(el) {
    console.log(el)
    const stackid = el.id;
    window.open(`/karten/createcard.html?stackid=${stackid}`, '_self');
}

function renameStack(newstackname, stackid) {
    const oldStackname = document.getElementById(stackid).getElementsByTagName("label")[0].innerHTML;

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"sessionid":"' + getCookie('sessionid') + '","oldStackname":"' + oldStackname + '","newStackname":"' + newstackname + '"}'
    };

    fetch(`${backend_host}/api/stacks/rename`, options)
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

    fetch(`${backend_host}/api/stacks/delete`, options)
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

function exit() {

}

function logout() {
    setCookie("sessionid", "");
    window.open('/login/login.html', '_self');
}




