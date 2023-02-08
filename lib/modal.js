function createModal(mode, msg, fn=null) {
    let modal = "";

    switch (mode) {
        case "yn":
            modal = `
                <div id="modalbg" class="modalbg">
                    <div id="modal" class="modal">
                        <p>${msg}</p>
                        <button id="modal-yes" class="modal-button">Ja</button>
                        <button id="modal-no" class="modal-button">Nein</button>
                    </div> 
                </div>
                `;
            document.body.innerHTML = document.body.innerHTML + modal;
            document.getElementById("modal-yes").addEventListener("click", () => { actionModal(fn, true) });
            document.getElementById("modal-no").addEventListener("click", () => { destroyModal(); });
            break;
        case "str":
            modal = `
                <div id="modalbg" class="modalbg">
                    <div id="modal" class="modal">
                        <p>${msg}</p>
                        <input id="modal-str" class="modal-str" type="text" value=""></input>
                        <button id="modal-ok" class="modal-button">Eingeben</button>
                        <button id="modal-cancel class="modal-button"">Abbrechen</button>
                    </div> 
                </div>
                `;
            document.body.innerHTML = document.body.innerHTML + modal;
            document.getElementById("modal-ok").addEventListener("click", () => { actionModal(fn, document.getElementById('modal-str').value) });
            document.getElementById("modal-cancel").addEventListener("click", () => { destroyModal() });
            break;
        case "err":
            modal = `
                <div id="modalbg" class="modalbg">
                    <div id="modal" class="modal">
                        <p>${msg}</p>
                        <button id="modal-ok" class="modal-button">Verstanden</button>
                    </div> 
                </div>
                `;
            document.body.innerHTML = document.body.innerHTML + modal;
            document.getElementById("modal-ok").addEventListener("click", () => { destroyModal() });
            break;
    }
}

function destroyModal() {
    document.getElementById("modalbg").remove();
}

function actionModal(fn, result) {
    destroyModal();//Dialogbox entfernen
    fn(result);
}