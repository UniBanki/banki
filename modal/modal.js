function createModal(el, mode, msg, functions) {
    let modal = "";

    switch (mode) {
        case "yn":
            modal = `
                <div id="modalbg" class="modalbg">
                    <div id="modal" class="modal">
                        <p>${msg}</p>
                        <button id="modal-yes">Ja</button>
                        <button id="modal-no">Nein</button>
                    </div> 
                </div>
                `;
            document.body.innerHTML = document.body.innerHTML + modal;
            document.getElementById("modal-yes").addEventListener("click", () => { actionModal(el, functions[0], "y") });
            document.getElementById("modal-no").addEventListener("click", () => { actionModal(el, functions[1], "n") });
            break;
        case "str":
            modal = `
                <div id="modalbg" class="modalbg">
                    <div id="modal" class="modal">
                        <p>${msg}</p>
                        <input id="modal-str" class="modal-str" type="text" value=""></input>
                        <button id="modal-ok">Eingeben</button>
                        <button id="modal-cancel">Abbrechen</button>
                    </div> 
                </div>
                `;
            document.body.innerHTML = document.body.innerHTML + modal;
            document.getElementById("modal-ok").addEventListener("click", () => { actionModal(el, functions[0], document.getElementById('modal-str').value) });
            document.getElementById("modal-cancel").addEventListener("click", () => { actionModal(el, functions[1]) });
            break;
        case "err":
            modal = `
                <div id="modalbg" class="modalbg">
                    <div id="modal" class="modal">
                        <p>${msg}</p>
                        <button id="modal-ok">Verstanden</button>
                    </div> 
                </div>
                `;
            document.body.innerHTML = document.body.innerHTML + modal;
            document.getElementById("modal-ok").addEventListener("click", () => { actionModal(el, functions[0], "ok") });
            break;
    }
}

function destroyModal() {
    document.getElementById("modalbg").remove();
}

function actionModal(el, fn, result) {
    destroyModal();//Dialogbox entfernen

    if (typeof fn !== 'undefined') {
        fn(result, el);//Folgefunktion ausführen
    }

}