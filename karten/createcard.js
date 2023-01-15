var editor = null;
var toolbar = null;
var buttons = null;
var contentArea = null;
var htmlQuestion = null;
var htmlAnswer = null;
var visuellView = null;

function screenSize() {
    editor = document.getElementById('editor');
    toolbar = document.getElementsByClassName('toolbar')[0];
    buttons = toolbar.querySelectorAll('.editor-btn');
    contentArea = editor.getElementsByClassName('content-area')[0];
    htmlQuestion = contentArea.getElementsByClassName('question')[0];
    htmlAnswer = contentArea.getElementsByClassName('answer-container')[0];
    visuellView = contentArea.getElementsByClassName('wysiwyg')[0];

    for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
    
        button.addEventListener('click', function (e) {
            let action = this.dataset.action;
            switch (action) {
                case 'toggle-view':
                    execCodeAction(this, editor);
                    break;
                default:
                    execDefaultAction(action);
            }
        });
    }

    console.info(`${screen.width} × ${screen.height}`);
    const editorCont = document.getElementById("editor");
    const questCont = document.getElementById("question");
    const toolbarCont = document.getElementById("toolbar");
    const answerCont = document.getElementById("answer");
    const header = document.getElementById("headerRight");

    if (screen.width >= 375 && screen.width <= 414) {
        header.style.cssText += "margin-top: 1em";
        editorCont.style.cssText += "padding: 0; margin-top: 1em; width: 364px;padding-top: 1em;";
        questCont.style.cssText += "font-size: 10pt; margin-left: 1.5em; width: 321px;";
        toolbarCont.style.cssText += "font-size: 10pt; margin-left: 1.5em; width: 321px;";
        answerCont.style.cssText += "font-size: 10pt; margin-left: 1.5em; width: 321px; height: 187px";
    }
    else if (screen.width < 374) {
        header.style.cssText += "margin-top: 1em";
        editorCont.style.cssText += "padding: 0; margin-top: 1em; width: 330px;padding-top: 1em;";
        questCont.style.cssText += "font-size: 10pt; margin-left: 1em; width: 296px;";
        toolbarCont.style.cssText += "font-size: 10pt; margin-left: 1em; width: 296px;";
        answerCont.style.cssText += "font-size: 10pt; margin-left: 1em; width: 296px; height: 187px";
    }
    else if (screen.width == 768) {
        header.style.cssText += "margin: -2em";
        editorCont.style.cssText += "margin-top: 4em;";
    }
}

document.addEventListener('selectionchange', selectionChange);


function parentTagActive(elem){
    if(!elem||!elem.classList||elem.classList.contains('wysiwyg')) return false;

    let toolbarButton;

    let tagName = elem.tagName.toLowerCase();
    toolbarButton = document.querySelectorAll('.toolbar .editor-btn[data-tag-name="${tagName}"]')[0];
    if(toolbarButton){
        toolbarButton.classList.add('active');
    }

    let textAlign = elem.style.textAlign; 
    toolbarButton = document.querySelectorAll('.toolbar .editor-btn[data-style="textAlign:${textAlign}"]')[0];
    if(toolbarButton){
        toolbarButton.classList.add('active');
    }

    return parentTagActive(elem.parentNode);
}

function childOf(child,parent){
    return parent.contains(child);
}

function selectionChange(e) {
    for (let i = 0; i < buttons.length; i++) {
        let button = null;
        button = buttons[i];

        if (button.dataset.action == 'toggle-view') continue;

        button.classList.remove('active');
    }

    if (!childOf(window.getSelection().anchorNode.parentNode, editor)) return false;

    parentTagActive(window.getSelection().anchorNode.parentNode);
}

function execDefaultAction(action) {
    document.execCommand(action, false);
}

function execCodeAction(button, editor) {

    if (button.classList.contains('active')) {
        visuellView.innerHTML = htmlQuestion.value;
        htmlQuestion.style.display = 'none';
        visuellView.style.display = 'block';

        button.classList.remove('active');
    } else {
        htmlQuestion.innerText = visuellView.innerHTML;
        visuellView.style.display = 'none';
        htmlQuestion.style.display = 'block';

        button.classList.add('active');
    }
}

