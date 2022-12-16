function checkLogin(){

}

function createStack() {
  const innerstacks = document.getElementById("stacks").innerHTML;

  const stackname = prompt("Name of new stack:");

  if(stackname){
  const newstack = `
    <div id="newStack" class="stack">
        <button onclick="expandStack()">Expand</button>
        <label id="stackName">${stackname}</label>
        <button onclick="createCard()">create cards</button>
        <button onclick="renameStack()">rename</button>
        <button onclick="deleteStack(this)">delete</button>
    </div>
    `;

    document.getElementById("stacks").innerHTML = newstack+innerstacks;}
}

function expandStack(){

}

function createCard(){

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

