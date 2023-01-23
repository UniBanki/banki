function createEditor(){
    var toolbarOptions = [[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    ['bold', 'italic', 'underline'],   
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],                                            
    ['link', 'image'],
    ['clean']];

    var quill = new Quill('#editor', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        }
      });
      var quill = new Quill('#editora', {
          theme: 'snow', 
          modules: {
            toolbar: toolbarOptions
          }
      });
}

function screenSize() {
    console.info(`${screen.width} × ${screen.height}`);
    const mainContainer = document.getElementById("mainContainer");
    const questCont = document.getElementsByClassName('.ql-container')[0];
    const toolbarCont = document.getElementsByClassName('.ql-toolbar');
    const answerCont = document.getElementById("answer");
    const header = document.getElementById("headerRight");

    if (screen.width >= 375 && screen.width <= 414) {
        header.style.cssText += "margin-top: 1em";
        mainContainer.style.cssText += "padding: 0; margin-top: 1em; width: 364px;padding-top: 1em;";
        questCont.style.cssText += "font-size: 10pt; margin-left: 1.5em; width: 21em;";
        toolbarCont.style.cssText += "font-size: 10pt; margin-left: 1.5em; width: 321px;";
        answerCont.style.cssText += "font-size: 10pt; margin-left: 1.5em; width: 321px; height: 187px";
    }
    else if (screen.width < 374) {
        header.style.cssText += "margin-top: 1em";
        mainContainer.style.cssText += "padding: 0; margin-top: 1em; width: 330px;padding-top: 1em;";
        questCont.style.cssText += "font-size: 10pt; margin-left: 1em; width: 296px;";
        toolbarCont.style.cssText += "font-size: 10pt; margin-left: 1em; width: 296px;";
        answerCont.style.cssText += "font-size: 10pt; margin-left: 1em; width: 296px; height: 187px";
    }
    else if (screen.width == 768) {
        header.style.cssText += "margin: -2em";
        mainContainer.style.cssText += "margin-top: 4em;";
    }
}

function createCard(){
    const question = document.getElementsByClassName("ql-editor")[0].innerHTML;
    const answer = document.getElementsByClassName("ql-editor")[1].innerHTML; 
}