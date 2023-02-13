const backend_host = 'https://h2992036.stratoserver.net';
var quillQuestion; 
var quillAnswer;


function createEditor(){
    var toolbarOptions = [[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],   
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],                                            
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

function getCurrentStack() {
    //holt sich den Stapelnamen aus der URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const stackid = urlParams.get("stackid");
    const stackname = decodeURIComponent(stackid);
    return stackname;
}

function createCard(){
    const frontContent = quillQuestion.getContents();
    const backContent = quillAnswer.getContents();

    const card = {
        front: frontContent, 
        back: backContent
    };

   const options = {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json'}, 
        body: '{"sessionid":"' + globSessionid + '","stackname":"' + 
        getCurrentStack() + '","card":"' + card + '"}'
    };

   fetch(`${backend_host}/api/cards/update`, options)
        .then(response => response.json())
        .then(function (response){
            if(response.err){
                createModal(null, 'err', response.err, [null]);
            } else{
                quillQuestion.setContents([{ insert: '\n' }]);
                quillAnswer.setContents([{ insert: '\n' }]);
            }
        })
        .catch(err => createModal(null, 'err', err.message, [null]));
}
