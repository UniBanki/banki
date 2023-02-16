var quillQuestion;
var quillAnswer; 

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