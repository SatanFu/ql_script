const fs = require('fs')
const crypto = require("crypto");
async function readFile(name) {
    try {
        return fs.readFileSync(name).toString()
    } catch (err) {
        return ""
    }
}

async function writeFile(name, content, opt) {
    try {
        fs.writeFileSync(name, content, { flag: opt })
    } catch (err) {
    }
}

function md5(content) {
    return crypto
        .createHash("md5")
        .update(content)
        .digest("hex");
}

module.exports = {
    writeFile,
    readFile,
    md5
}