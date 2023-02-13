function setSessionid(sessionid){
    localStorage.setItem("sessionid", sessionid);
}

function getSessionid(){
    return localStorage.getItem("sessionid")
}