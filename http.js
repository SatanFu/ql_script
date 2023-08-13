const axios = require('axios');
const dotenv = require('dotenv')

dotenv.config()
async function postWebsite(id, name, content, category) {
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