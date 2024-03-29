const backend_host = "https://h2992036.stratoserver.net";

//......View

async function onload() {
    screenSize();
    try {
        const stacks = await serverGetStacks();
        setStacks(stacks);
        updateStacklist(stacks);
    } catch (e) {
        createModal(null, "err", e.message, [null]);
    }
}

/**
 * Generiert div für jeden Stapel in stacks.
 */
async function updateStacklist(stacks) {
    document.getElementById("stacks").innerHTML = "";
    for (let i = 0; i < stacks.length; i++) {
        let stackid = encodeURIComponent(stacks[i].stackname);
        const newstack = `<div id="${stackid}" class="stack">
                <button onclick="expandStack()">Übersicht</button>
                <label>${stacks[i].stackname}</label>
                <button onclick="learnCard(${stackid})">Lernen</button>
                <button onclick="createCard(${stackid})">Bearbeiten</button>
                <button onclick="createModal('str', 'Neuen Stapelnamen eingeben:', async (newStackname)=>{
                    try {
                        checkStackname(newStackname);
                        renameStack(newStackname, '${stacks[i].stackname}');
                        const stacks = await serverSetStacks();
                        setStacks(stacks);
                        updateStacklist(stacks);
                    } catch (e) {
                        createModal('err', e.message);
                    }
                })">
                    Umbenennen
                </button>
                <button onclick="createModal('yn', 'Sicher, dass du den Stapel löschen möchtest?', async ()=>{
                    try{
                        deleteStack('${stacks[i].stackname}');
                        const stacks = await serverSetStacks();
                        setStacks(stacks);
                        updateStacklist(stacks);
                    }catch(e){
                        createModal('err', e.message);
                    }
                })"><img src="eimer.png" height="20"></button>
            </div>`;
        const innerstacks = document.getElementById("stacks").innerHTML;
        document.getElementById("stacks").innerHTML = newstack + innerstacks;
    }
}

function screenSize() {
    console.info(`${screen.width} x ${screen.height}`);
    const header = document.getElementById("headerRight");
    const overviewCont = document.getElementById("overview");
    if (screen.width >= 375 && screen.width <= 414) {
        overviewCont.style.cssText +=
            "margin-left: -6em; margin-top: -7em; width: 21em;";
        header.style.cssText +=
            "float:none; display:flex; justify-content: center;";
    } else if (screen.width >= 415 && screen.width <= 540) {
        overviewCont.style.cssText +=
            "margin-left: -9em; margin-top: -7em; width: 31em;";
        header.style.cssText +=
            "float:none; display:flex; justify-content: center; margin-top:1em;";
    } else if (screen.width >= 768 && screen.width <= 820) {
        overviewCont.style.cssText +=
            "margin-left: -13em; margin-top: -14em; width: 44em;";
        header.style.cssText += "margin: -3em;";
    }
}

//........Controller

async function createStack(stackname) {
    try {
        let stacks = getStacks();
        checkStackname(stackname);
        stacks.push({
            stackname: stackname,
            cards: [],
        });
        setStacks(stacks);
    } catch (e) {
        throw new Error(e);
    }
}

function checkStackname(stackname) {
    let stacks = getStacks();
    for (let i = 0; i < stacks.length; i++) {
        if (stacks[i].stackname === stackname) {
            throw new Error("Stapelname existiert bereits");
        }
    }
}

function createCard(el) {
    const stackid = el.id;
    window.open(`/karten/createcard.html?stackid=${stackid}`, "_self");
}

function learnCard(el){
    const stackid = el.id;
    window.open(`/karten/learncard.html?stackid=${stackid}`, "_self");
}

function renameStack(newStackname, oldStackname) {
    console.log(oldStackname);
    try {
        let stacks = getStacks();
        for (let i = 0; i < stacks.length; i++) {
            if (stacks[i].stackname === oldStackname) {
                stacks[i].stackname = newStackname;
                break;
            }
        }
        setStacks(stacks);
    } catch (e) {
        throw new Error(e);
    }
}

function deleteStack(stackname) {
    let stacks = getStacks();
    
    for(let i = 0; i<stacks.length;i++){
        if(stacks[i].stackname===stackname){
            stacks.splice(i,1);
            break;
        }
    }
    setStacks(stacks);
}



function logout() {
    setSessionid("");
    window.open("/login/login.html", "_self");
}
