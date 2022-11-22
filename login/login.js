function getCookie(cookieName) {//ignores attributes from cookies, returns only the value
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
        let [key,value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}


function login(username, password){
    const old_sessionid=getCookie("sessionid");
    const user = {"username":username, "password":password, "sessionid":old_sessionid};

    fetch('https://h2992036.stratoserver.net/login.php', {
        method: 'POST',
        mode:'cors',
        cache:'no-cache',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(user),
    })
        .then((response)=> response.json())
        .then((response)=>{
            try{
                //const jsonresponse = JSON.parse(response)
                const new_sessionid = response.sessionid;
                if(new_sessionid!=undefined){
                    document.cookie="sessionid="+new_sessionid+"; path=/; Secure";
                }

            }catch{

            }
        })
        .catch((error)=>{
            console.error('Error:',error);
        });
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
            console.log('Success:', user);
        })
        .catch((error)=>{
            console.error('Error:',error);
        });
}
