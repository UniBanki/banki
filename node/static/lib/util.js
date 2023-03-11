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
        try {
            let response = await fetch('/api/stacks/get');
            response = await response.json();
            if (response.status===400) {
                throw new Error(response.err);
            }
            resolve(response.stacks);//returns an array with stacks
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
                '{"stacks":' +
                JSON.stringify(getStacks()) +
                "}",
        };

        try {
            let response = await fetch('/api/stacks/set', options);
            response = await response.json();
            if (response.status===400) {
                throw new Error(response.err);
            }
            resolve(response.stacks);//returns an array with stacks
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