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

function createContent(){
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


function bodyLoad(){
    createContent();

    const stackname = getUrlParameter("stackid"); 

    const stacks = getStacks(); 

    for(let i = 0; i < stacks.length; i++)
    {
        if(stacks[i].stackname === stackname)
        {
            stack = stacks[i];
            break;
        }
    }
    getCard();
}

function getCard(){
    let cards = stack.cards;
    var front; 
    var back;

    for (let i = 0; i < cards.length; i++)
    {
        if(cards[i].numcorrect < 3)
        {
            card = cards[i];
            front = card.front;
            back = card.back;
            quillQuestion.setContents(front);
            quillAnswer.setContents(back);
        }
    }
}

function statisticsCard(result){
    if (result == true){
        card.numcorrect = card.numcorrect + 1;
    }

    if (result == false){
        card.numcorrect = 0; 
    }

    getCard();
}
