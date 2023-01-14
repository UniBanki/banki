function bodyload() {
    document.body.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            document.getElementById("login").click();

        };
    })
}


function login(username, password) {

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"username":"' + username + '","password":"' + password + '"}'
    };

    fetch('https://h2992036.stratoserver.net/api/login', options)
        .then(response => response.json())
        .then(response => {
            if(response.err){
                createModal(this, 'err', response.err, [])
            }else{
                document.cookie = "sessionid=" + response.sessionid + "; path=/; SameSite=None; Secure";
                window.open('/overview/overview.html','_self');                
            }         
        })
        .catch(err => createModal(null, 'err', err.message));
}

function register(username, password) {
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"username":"' + username + '","password":"' + password + '"}'
    };

    fetch('https://h2992036.stratoserver.net/api/register', options)
        .then(response => response.json())
        .then(response => {
            if(response.err){
                createModal(this, 'err', response.err, [])
            }else{
                document.cookie = "sessionid=" + response.sessionid + "; path=/; SameSite=None; Secure";
                window.open('/overview/overview.html','_self');
            }            
        })
        .catch(err => createModal(null, 'err', err.message));
}
