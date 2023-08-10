const fs = require('fs')

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

module.exports = {
    writeFile,
    readFile
}