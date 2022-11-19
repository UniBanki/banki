function login(username, password){
    console.log("login");
    console.log(username, password);


}

function register(username, password){
    console.log("register");
    console.log(username, password);

    const user = {username:username, password:password};

    fetch('https://h2992036.stratoserver.net/register.php', {
        method: 'POST',
        mode:'cors',
        cache:'no-cache',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response)=> response.json())
        .then((user)=>{
            console.log('Success:', user);
        })
        .catch((error)=>{
            console.error('Error:',error);
        });
}
