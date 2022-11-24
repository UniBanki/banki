function createStack() {
  const innerstacks = document.getElementById("stacks").innerHTML;

  const stackname = prompt("Name of new stack:");

  const newstack = `
    <div class="stack">
        <button>Expand</button>
        <label>${stackname}</label>
        <button>create card</button>
        <button>rename</button>
        <button>delete</button>
    </div>
    `;

  document.getElementById("stacks").innerHTML = newstack+innerstacks;
}
