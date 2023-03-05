const backend_host = 'https://h2992036.stratoserver.net';
var quillQuestion;
var quillAnswer;


function createEditor() {
    var toolbarOptions = [[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['link', 'image']];

    quillQuestion = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions

        }
    });
    quillAnswer = new Quill('#editora', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        }
    });
}

function screenSize() {
    console.info(`${screen.width} × ${screen.height}`);
    const mainContainer = document.getElementById("mainContainer");
    const questCont = document.getElementById("editor");
    //const toolbarCont = document.getElementsByClassName('.ql-toolbar');
    //const answerCont = document.getElementById("answer");
    const header = document.getElementById("headerRight");

    if (screen.width >= 375 && screen.width <= 414) {
        header.style.cssText += "margin-top: 1em";
        mainContainer.style.cssText += "padding-top: 1em; padding-left: 8em;";
        //questCont.style.cssText += "font-size: 10pt; margin-left: 1.5em; width: 21em;";
        //toolbarCont.style.cssText += "font-size: 10pt; margin-left: 1.5em; width: 321px;";
        //answerCont.style.cssText += "font-size: 10pt; margin-left: 1.5em; width: 321px; height: 187px";
    }
    else if (screen.width < 374) {
        header.style.cssText += "margin-top: 1em";
        mainContainer.style.cssText += "padding: 0; margin-top: 1em; width: 330px;padding-top: 1em;";
        //questCont.style.cssText += "font-size: 10pt; margin-left: 1em; width: 296px;";
        //toolbarCont.style.cssText += "font-size: 10pt; margin-left: 1em; width: 296px;";
        //answerCont.style.cssText += "font-size: 10pt; margin-left: 1em; width: 296px; height: 187px";
    }
    else if (screen.width == 768) {
        header.style.cssText += "margin: -2em";
        mainContainer.style.cssText += "margin-top: 4em;";
    }
}



async function createCard() {
    try {
        const card = {
            front: quillQuestion.getContents(),
            back: quillAnswer.getContents(),
            numcorrect: 0,
            id: Date.now().toString(),
        };
        const stackname = getUrlParameter("stackid");

        let stacks = getStacks();

        for (let i = 0; i < stacks.length; i++) {
            if (stacks[i].stackname === stackname) {
                stacks[i].cards.push(card);
                break;
            }
        }
        setStacks(stacks);
        stacks = await serverSetStacks();
        setStacks(stacks);
        quillQuestion.setContents([{ insert: '\n' }]);
        quillAnswer.setContents([{ insert: '\n' }]);
    }
    catch (e) {
        createModal('err', e.message);
    }
}
