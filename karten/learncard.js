const backend_host = 'https://h2992036.stratoserver.net';
var quillQuestion;
var quillAnswer;
var stack;
var card;

function screenSize() {
    console.info(`${screen.width} × ${screen.height}`);
    const mainContainer = document.getElementById("mainContainer");
    const questCont = document.getElementById("contentAnswer");
    const header = document.getElementById("headerRight");

    if (screen.width >= 375 && screen.width <= 414) {
        header.style.cssText += "margin-top: 1em";
        mainContainer.style.cssText += "padding-top: 1em; padding-left: 8em;";
    }
    else if (screen.width < 374) {
        header.style.cssText += "margin-top: 1em";
        mainContainer.style.cssText += "padding: 0; margin-top: 1em; width: 330px;padding-top: 1em;";
    }
    else if (screen.width == 768) {
        header.style.cssText += "margin: -2em";
        mainContainer.style.cssText += "margin-top: 4em;";
    }
}

function createContent() {
    quillQuestion = new Quill('#contentQuestion', {
        modules: {
            toolbar: false
        },
        theme: 'snow',
        readOnly: true
    });

    quillAnswer = new Quill('#contentAnswer', {
        modules: {
            toolbar: false
        },
        theme: 'snow',
        readOnly: true
    });
}


function bodyLoad() {

    createContent();
    const stackname = getUrlParameter("stackid");

    const stacks = getStacks();

    for (let i = 0; i < stacks.length; i++) {
        if (stacks[i].stackname === stackname) {
            stack = stacks[i];
            break;
        }
    }
    getCard();
}

function getCard() {

    quillAnswer.setContents([{ insert: '\n' }]);
    const button = document.getElementById("getAnswer");
    button.style.cssText += "display: inline-block;";

    let cards = stack.cards;
    var front;
    var back;

    cards.sort((a, b) => 0.5 - Math.random());
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].numcorrect < 3) {
            card = cards[i];
            front = card.front;
            back = card.back;
            quillQuestion.setContents(front);
            break;
        }
    }
}

function getAnswer() {
    quillAnswer.setContents(card.back);
    const button = document.getElementById("getAnswer");
    button.style.cssText += "display: none;";
}

function statisticsCard(result) {
    if (result == true) {
        for (let i = 0; i < stack.cards.length; i++) {
            if (stack.cards[i].id === card.id) {
                stack.cards[i].numcorrect++;
                updateCard();
            }
        }
    }

    if (result == false) {
        for (let i = 0; i < stack.cards.length; i++) {
            if (stack.cards[i].id === card.id) {
                stack.cards[i].numcorrect = 0;
                updateCard();
            }
        }
    }
}

async function updateCard() {
    try {
        const stackname = getUrlParameter("stackid");

        let stacks = getStacks();

        for (let i = 0; i < stacks.length; i++) {
            if (stacks[i].stackname === stackname) {
                for (let j = 0; j < stacks[i].cards.length; j++) {
                    if (stacks[i].cards[j].id === card.id) {
                        stacks[i].cards[j].numcorrect = card.numcorrect;
                        break;
                    }
                }
            }
        }
        setStacks(stacks);
        stacks = await serverSetStacks();
        setStacks(stacks);
    } catch (e) {
        createModal('err', e.message);
    }
}
