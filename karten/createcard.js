function screenSize() {
    console.info(`${screen.width} × ${screen.height}`);
    const editorCont = document.getElementById("editor");
    const questCont = document.getElementById("question");
    const toolbarCont = document.getElementsByClassName("toolbar");
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
