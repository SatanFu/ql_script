const dotenv = require('dotenv')
const mysql = require('mysql2/promise')

async function insertWebSite(name, content, category) {
    dotenv.config()
    const connection = await mysql.createConnection(process.env.DATABASE_URL)
    await connection.query('INSERT INTO `website` (name, content, category, updated_at) VALUES (?, ?, ?, NOW())', [name, content, category]);
    console.log("爬取数据插入数据库");
}

module.exports = {
    insertWebSite
}