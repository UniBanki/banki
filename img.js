const fs = require("fs");

function insertImgInFs(filename, file){
    fs.writeFile(path.join(__dirname, "images", filename))
}


module.exports = { updateSession, createUser, checkLogin, validateSession };