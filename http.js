const axios = require('axios');
const dotenv = require('dotenv');
const { appendLog } = require('./util');

dotenv.config({ path: __dirname + '/.env' })
async function postWebsite(id, name, content, category) {
    appendLog(`url:${process.env.URL}\n`)
    return await axios.post(`${process.env.URL}${id}`, {
        name,
        content: content,
        category,
        sign: process.env.SIGN
    })
}

module.exports = {
    postWebsite
}