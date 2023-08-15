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

async function appendLog(content) {
    try {
        fs.appendFileSync("log.txt", content)
    } catch (err) {
    }
}

function md5(content) {
    return crypto
        .createHash("md5")
        .update(content)
        .digest("hex");
}

function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t));
}

module.exports = {
    writeFile,
    readFile,
    appendLog,
    md5,
    delay
}