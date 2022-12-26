function checkLogin(){

}

function screenSize(){
  console.info(`${ screen.width } × ${ screen.height }`);
  const header = document.getElementById("headerRight");
  const overviewCont = document.getElementById("overview");
  const headerCenter = document.getElementById("headerCenter");

  if(screen.width >= 375 && screen.width <= 414){
    overviewCont.style.cssText += "margin-left: -6em; margin-top: -7em; width: 21em;";
    header.style.cssText += "float:none; display:flex; justify-content: center;";
  }
  else if (screen.width >= 415 && screen.width <=540){
    overviewCont.style.cssText += "margin-left: -9em; margin-top: -7em; width: 31em;";
    header.style.cssText += "float:none; display:flex; justify-content: center; margin-top:1em;";
  }
  else if (screen.width >= 768 && screen.width<= 820){
    overviewCont.style.cssText += "margin-left: -13em; margin-top: -14em; width: 44em;";
    header.style.cssText += "margin: -3em;";
  }
}

function createStack() {
  const innerstacks = document.getElementById("stacks").innerHTML;

  const stackname = prompt("Name of new stack:");

  if(stackname){
  const newstack = `
    <div id="newStack" class="stack">
        <button onclick="expandStack()">Übersicht</button>
        <label id="stackName">${stackname}</label>
        <button onclick="createCard()">Hinzufügen</button>
        <button onclick="renameStack()">Umbenennen</button>
        <button onclick="deleteStack(this)">Löschen</button>
    </div>
    `;
    document.getElementById("stacks").innerHTML = newstack+innerstacks;}
}

function expandStack(){

}

function createCard(){
  window.open('../karten/createcard.html','_self');
}

function renameStack(){
    const stackrename = prompt("New name of stack:");

    document.getElementById("stackName").innerHTML = stackrename;
}

function deleteStack(item){
  const stackname = document.getElementById("stackName").innerHTML;
  if(confirm("delete "+ stackname + "?")){
  item.parentNode.remove();
  }
}

function exit(){

}

