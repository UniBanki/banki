function setSessionid(sessionid){
    localStorage.setItem("sessionid", sessionid);
}

function getSessionid(){
    return localStorage.getItem("sessionid")
}

function setStacks(stacks) {
    localStorage.setItem("stacks", JSON.stringify(stacks));
}

function getStacks() {
    //returns null if stacks are empty
    try {
        const stacks = JSON.parse(localStorage.getItem("stacks"));
        if (stacks == null) {
            return [];
        } else {
            return stacks;
        }
    } catch (e) {
        return [];
    }
}

async function serverGetStacks() {
    //returns stacks from server
    return new Promise(async function (resolve, reject) {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: '{"sessionid":"' + getSessionid() + '"}',
        };

        try {
            let response = await fetch(
                `${backend_host}/api/stacks/get`,
                options
            );
            response = await response.json();
            if (response.err) {
                throw new Error(response.err);
            }

            resolve(response.stacks);
        } catch (e) {
            reject(e);
        }
    });
}

async function serverSetStacks() {
    return new Promise(async function (resolve, reject) {
        const options = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body:
                '{"sessionid":"' +
                getSessionid() +
                '", "stacks":' +
                JSON.stringify(getStacks()) +
                "}",
        };

        try {
            let response = await fetch(
                `${backend_host}/api/stacks/set`,
                options
            );
            response = await response.json();
            if (response.err) {
                throw new Error(response.err);
            }
            resolve(response.stacks);
        } catch (e) {
            reject(e);
        }
    });
}

function getUrlParameter(paramkey) {
    //holt sich den Stapelnamen aus der URL
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const paramvalue = urlParams.get(paramkey);
    const decodedvalue = decodeURIComponent(paramvalue);
    return decodedvalue;
}