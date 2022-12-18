function checkLogin(){

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

