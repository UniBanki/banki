function bodyload() {
    document.body.addEventListener("keypress", function (event) {
        // If the user presses the "Enter" key on the keyboard
        if (event.key === "Enter") {
            // Cancel the default action, if needed
            document.getElementById("login").click();

        };
    })
}

function getCookie(cookieName) {//ignores attributes from cookies, returns only the values
    let cookie = {};
    document.cookie.split(';').forEach(function (el) {
        let [key, value] = el.split('=');
        cookie[key.trim()] = value;
    })
    return cookie[cookieName];
}


function login(username, password) {

    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{"username":"' + username + '","password":"' + password + '"}'
    };

    fetch('/api/login', options)
        .then(response => response.json())
        .then(response => {
            if(response.err){
                createModal(this, 'err', response.err, [])
            }else{
                document.cookie = "sessionid=" + response.sessionid + "; path=/; SameSite=None; Secure";
                if(window.location.pathname.match(/\/d\//)){
                    window.open('/d/overview','_self');
                }else if(window.location.pathname.match(/\/k\//)){
                    window.open('/k/overview','_self');
                }else{
                    window.open('/overview','_self');
                }   
                
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

    fetch('/api/register', options)
        .then(response => response.json())
        .then(response => {
            if(response.err){
                createModal(this, 'err', response.err, [])
            }else{
                document.cookie = "sessionid=" + response.sessionid + "; path=/; SameSite=None; Secure";
                if(window.location.pathname.match(/\/d\//)){
                    window.open('/d/overview','_self');
                }else if(window.location.pathname.match(/\/k\//)){
                    window.open('/k/overview','_self');
                }else{
                    window.open('/overview','_self');
                }   
                
            }            
        })
        .catch(err => createModal(null, 'err', err.message));
}
