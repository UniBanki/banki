function login(username, password){

}

function register(username, password){
    const user = {"username":username, "password":password};

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
            console.log('Succes:', user);
        })
        .catch((error)=>{
            console.error('Error:',error);
        });
}
