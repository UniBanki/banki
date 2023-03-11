async function sessionidValid() {
    return new Promise(function (resolve, reject) {
        fetch('/api/checkSessionid')
            .then(function (response) {
                if(response.status===200){
                    resolve();
                }else{
                    reject();
                }
            })
            .catch(err => reject());
    });
}

async function gotoLogin() {
    try {
        await sessionidValid();
        window.open('/overview/overview.html', '_self')
    } catch (error) {
        window.open('/login/login.html', '_self')
    }
}