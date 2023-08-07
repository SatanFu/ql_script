
async function load() {

    require('dotenv').config()
    const mysql = require('mysql2/promise')
    console.log(process.env.DATABASE_URL);
    const connection = await mysql.createConnection(process.env.DATABASE_URL)
    // const categories = [
    //     {
    //         id: 1,
    //         name: "热门",
    //     },
    //     {
    //         id: 2,
    //         name: "综合",
    //     },
    //     {
    //         id: 3,
    //         name: "科技",
    //     },
    //     {
    //         id: 4,
    //         name: "社区",
    //     },
    //     {
    //         id: 5,
    //         name: "视频",
    //     },
    //     {
    //         id: 6,
    //         name: "开发",
    //     },
    // ];

    // categories.forEach(async (item) => {
    //     await connection.query('INSERT INTO `category` (id, name, updated_at) VALUES (?, ?, NOW())', [item.id, item.name]);
    // })

    // const websites = [
    //     {
    //         name: "Twitter",
    //         content: `[{"id":1,"title":"Twitter title 1","link":"https://www.baidu.com"},{"id":2,"title":"Twitter title 2","link":"https://www.baidu.com"},{"id":3,"title":"Twitter title 3","link":"https://www.baidu.com"},{"id":4,"title":"Twitter title 4","link":"https://www.baidu.com"},{"id":5,"title":"Twitter title 5","link":"https://www.baidu.com"},{"id":6,"title":"Twitter title 6","link":"https://www.baidu.com"},{"id":7,"title":"Twitter title 7","link":"https://www.baidu.com"},{"id":8,"title":"Twitter title 8","link":"https://www.baidu.com"},{"id":9,"title":"Twitter title 9","link":"https://www.baidu.com"},{"id":10,"title":"Twitter title 10","link":"https://www.baidu.com"}]`,
    //         category: "1,2,4,",
    //     },
    //     {
    //         name: "Facebook",
    //         content: `[{"id":1,"title":"Facebook title 1","link":"https://www.baidu.com"},{"id":2,"title":"Facebook title 2","link":"https://www.baidu.com"},{"id":3,"title":"Facebook title 3","link":"https://www.baidu.com"},{"id":4,"title":"Facebook title 4","link":"https://www.baidu.com"},{"id":5,"title":"Facebook title 5","link":"https://www.baidu.com"},{"id":6,"title":"Facebook title 6","link":"https://www.baidu.com"},{"id":7,"title":"Facebook title 7","link":"https://www.baidu.com"},{"id":8,"title":"Facebook title 8","link":"https://www.baidu.com"},{"id":9,"title":"Facebook title 9","link":"https://www.baidu.com"},{"id":10,"title":"Facebook title 10","link":"https://www.baidu.com"}]`,
    //         category: "1,2,4,",
    //     },
    //     {
    //         name: "Github",
    //         content: `[{"id":1,"title":"Github title 1","link":"https://www.baidu.com"},{"id":2,"title":"Github title 2","link":"https://www.baidu.com"},{"id":3,"title":"Github title 3","link":"https://www.baidu.com"},{"id":4,"title":"Github title 4","link":"https://www.baidu.com"},{"id":5,"title":"Github title 5","link":"https://www.baidu.com"},{"id":6,"title":"Github title 6","link":"https://www.baidu.com"},{"id":7,"title":"Github title 7","link":"https://www.baidu.com"},{"id":8,"title":"Github title 8","link":"https://www.baidu.com"},{"id":9,"title":"Github title 9","link":"https://www.baidu.com"},{"id":10,"title":"Github title 10","link":"https://www.baidu.com"}]`,
    //         category: "1,2,3,6,",
    //     },
    //     {
    //         name: "WhatsApp",
    //         content: `[{"id":1,"title":"WhatsApp title 1","link":"https://www.baidu.com"},{"id":2,"title":"WhatsApp title 2","link":"https://www.baidu.com"},{"id":3,"title":"WhatsApp title 3","link":"https://www.baidu.com"},{"id":4,"title":"WhatsApp title 4","link":"https://www.baidu.com"},{"id":5,"title":"WhatsApp title 5","link":"https://www.baidu.com"},{"id":6,"title":"WhatsApp title 6","link":"https://www.baidu.com"},{"id":7,"title":"WhatsApp title 7","link":"https://www.baidu.com"},{"id":8,"title":"WhatsApp title 8","link":"https://www.baidu.com"},{"id":9,"title":"WhatsApp title 9","link":"https://www.baidu.com"},{"id":10,"title":"WhatsApp title 10","link":"https://www.baidu.com"}]`,
    //         category: "1,2,",
    //     },
    //     {
    //         name: "Youtube",
    //         content: `[{"id":1,"title":"Youtube title 1","link":"https://www.baidu.com"},{"id":2,"title":"Youtube title 2","link":"https://www.baidu.com"},{"id":3,"title":"Youtube title 3","link":"https://www.baidu.com"},{"id":4,"title":"Youtube title 4","link":"https://www.baidu.com"},{"id":5,"title":"Youtube title 5","link":"https://www.baidu.com"},{"id":6,"title":"Youtube title 6","link":"https://www.baidu.com"},{"id":7,"title":"Youtube title 7","link":"https://www.baidu.com"},{"id":8,"title":"Youtube title 8","link":"https://www.baidu.com"},{"id":9,"title":"Youtube title 9","link":"https://www.baidu.com"},{"id":10,"title":"Youtube title 10","link":"https://www.baidu.com"}]`,
    //         category: "1,2,5,",
    //     },
    //     {
    //         name: "Skype",
    //         content: `[{"id":1,"title":"Skype title 1","link":"https://www.baidu.com"},{"id":2,"title":"Skype title 2","link":"https://www.baidu.com"},{"id":3,"title":"Skype title 3","link":"https://www.baidu.com"},{"id":4,"title":"Skype title 4","link":"https://www.baidu.com"},{"id":5,"title":"Skype title 5","link":"https://www.baidu.com"},{"id":6,"title":"Skype title 6","link":"https://www.baidu.com"},{"id":7,"title":"Skype title 7","link":"https://www.baidu.com"},{"id":8,"title":"Skype title 8","link":"https://www.baidu.com"},{"id":9,"title":"Skype title 9","link":"https://www.baidu.com"},{"id":10,"title":"Skype title 10","link":"https://www.baidu.com"}]`,
    //         category: "1,2,",
    //     },
    //     {
    //         name: "Gitlab",
    //         content: `[{"id":1,"title":"Gitlab title 1","link":"https://www.baidu.com"},{"id":2,"title":"Gitlab title 2","link":"https://www.baidu.com"},{"id":3,"title":"Gitlab title 3","link":"https://www.baidu.com"},{"id":4,"title":"Gitlab title 4","link":"https://www.baidu.com"},{"id":5,"title":"Gitlab title 5","link":"https://www.baidu.com"},{"id":6,"title":"Gitlab title 6","link":"https://www.baidu.com"},{"id":7,"title":"Gitlab title 7","link":"https://www.baidu.com"},{"id":8,"title":"Gitlab title 8","link":"https://www.baidu.com"},{"id":9,"title":"Gitlab title 9","link":"https://www.baidu.com"},{"id":10,"title":"Gitlab title 10","link":"https://www.baidu.com"}]`,
    //         category: "2,3,6,",
    //     },
    //     {
    //         name: "Medium",
    //         content: `[{"id":1,"title":"Medium title 1","link":"https://www.baidu.com"},{"id":2,"title":"Medium title 2","link":"https://www.baidu.com"},{"id":3,"title":"Medium title 3","link":"https://www.baidu.com"},{"id":4,"title":"Medium title 4","link":"https://www.baidu.com"},{"id":5,"title":"Medium title 5","link":"https://www.baidu.com"},{"id":6,"title":"Medium title 6","link":"https://www.baidu.com"},{"id":7,"title":"Medium title 7","link":"https://www.baidu.com"},{"id":8,"title":"Medium title 8","link":"https://www.baidu.com"},{"id":9,"title":"Medium title 9","link":"https://www.baidu.com"},{"id":10,"title":"Medium title 10","link":"https://www.baidu.com"}]`,
    //         category: "1,2,4,",
    //     },
    //     {
    //         name: "Linkedin",
    //         content: `[{"id":1,"title":"Linkedin title 1","link":"https://www.baidu.com"},{"id":2,"title":"Linkedin title 2","link":"https://www.baidu.com"},{"id":3,"title":"Linkedin title 3","link":"https://www.baidu.com"},{"id":4,"title":"Linkedin title 4","link":"https://www.baidu.com"},{"id":5,"title":"Linkedin title 5","link":"https://www.baidu.com"},{"id":6,"title":"Linkedin title 6","link":"https://www.baidu.com"},{"id":7,"title":"Linkedin title 7","link":"https://www.baidu.com"},{"id":8,"title":"Linkedin title 8","link":"https://www.baidu.com"},{"id":9,"title":"Linkedin title 9","link":"https://www.baidu.com"},{"id":10,"title":"Linkedin title 10","link":"https://www.baidu.com"}]`,
    //         category: "1,2,3,",
    //     },
    //     {
    //         name: "Google",
    //         content: `[{"id":1,"title":"Google title 1","link":"https://www.baidu.com"},{"id":2,"title":"Google title 2","link":"https://www.baidu.com"},{"id":3,"title":"Google title 3","link":"https://www.baidu.com"},{"id":4,"title":"Google title 4","link":"https://www.baidu.com"},{"id":5,"title":"Google title 5","link":"https://www.baidu.com"},{"id":6,"title":"Google title 6","link":"https://www.baidu.com"},{"id":7,"title":"Google title 7","link":"https://www.baidu.com"},{"id":8,"title":"Google title 8","link":"https://www.baidu.com"},{"id":9,"title":"Google title 9","link":"https://www.baidu.com"},{"id":10,"title":"Google title 10","link":"https://www.baidu.com"}]`,
    //         category: "1,2,3,",
    //     },
    //     {
    //         name: "Slack",
    //         content: `[{"id":1,"title":"Slack title 1","link":"https://www.baidu.com"},{"id":2,"title":"Slack title 2","link":"https://www.baidu.com"},{"id":3,"title":"Slack title 3","link":"https://www.baidu.com"},{"id":4,"title":"Slack title 4","link":"https://www.baidu.com"},{"id":5,"title":"Slack title 5","link":"https://www.baidu.com"},{"id":6,"title":"Slack title 6","link":"https://www.baidu.com"},{"id":7,"title":"Slack title 7","link":"https://www.baidu.com"},{"id":8,"title":"Slack title 8","link":"https://www.baidu.com"},{"id":9,"title":"Slack title 9","link":"https://www.baidu.com"},{"id":10,"title":"Slack title 10","link":"https://www.baidu.com"}]`,
    //         category: "2,4,",
    //     },
    //     {
    //         name: "Behance",
    //         content: `[{"id":1,"title":"Behance title 1","link":"https://www.baidu.com"},{"id":2,"title":"Behance title 2","link":"https://www.baidu.com"},{"id":3,"title":"Behance title 3","link":"https://www.baidu.com"},{"id":4,"title":"Behance title 4","link":"https://www.baidu.com"},{"id":5,"title":"Behance title 5","link":"https://www.baidu.com"},{"id":6,"title":"Behance title 6","link":"https://www.baidu.com"},{"id":7,"title":"Behance title 7","link":"https://www.baidu.com"},{"id":8,"title":"Behance title 8","link":"https://www.baidu.com"},{"id":9,"title":"Behance title 9","link":"https://www.baidu.com"},{"id":10,"title":"Behance title 10","link":"https://www.baidu.com"}]`,
    //         category: "2,4,",
    //     },
    //     {
    //         name: "Dribbble",
    //         content: `[{"id":1,"title":"Dribbble title 1","link":"https://www.baidu.com"},{"id":2,"title":"Dribbble title 2","link":"https://www.baidu.com"},{"id":3,"title":"Dribbble title 3","link":"https://www.baidu.com"},{"id":4,"title":"Dribbble title 4","link":"https://www.baidu.com"},{"id":5,"title":"Dribbble title 5","link":"https://www.baidu.com"},{"id":6,"title":"Dribbble title 6","link":"https://www.baidu.com"},{"id":7,"title":"Dribbble title 7","link":"https://www.baidu.com"},{"id":8,"title":"Dribbble title 8","link":"https://www.baidu.com"},{"id":9,"title":"Dribbble title 9","link":"https://www.baidu.com"},{"id":10,"title":"Dribbble title 10","link":"https://www.baidu.com"}]`,
    //         category: "2,4,",
    //     },
    //     {
    //         name: "Instagram",
    //         content: `[{"id":1,"title":"Instagram title 1","link":"https://www.baidu.com"},{"id":2,"title":"Instagram title 2","link":"https://www.baidu.com"},{"id":3,"title":"Instagram title 3","link":"https://www.baidu.com"},{"id":4,"title":"Instagram title 4","link":"https://www.baidu.com"},{"id":5,"title":"Instagram title 5","link":"https://www.baidu.com"},{"id":6,"title":"Instagram title 6","link":"https://www.baidu.com"},{"id":7,"title":"Instagram title 7","link":"https://www.baidu.com"},{"id":8,"title":"Instagram title 8","link":"https://www.baidu.com"},{"id":9,"title":"Instagram title 9","link":"https://www.baidu.com"},{"id":10,"title":"Instagram title 10","link":"https://www.baidu.com"}]`,
    //         category: "1,2,4,",
    //     },
    //     {
    //         name: "Yahoo",
    //         content: `[{"id":1,"title":"Yahoo title 1","link":"https://www.baidu.com"},{"id":2,"title":"Yahoo title 2","link":"https://www.baidu.com"},{"id":3,"title":"Yahoo title 3","link":"https://www.baidu.com"},{"id":4,"title":"Yahoo title 4","link":"https://www.baidu.com"},{"id":5,"title":"Yahoo title 5","link":"https://www.baidu.com"},{"id":6,"title":"Yahoo title 6","link":"https://www.baidu.com"},{"id":7,"title":"Yahoo title 7","link":"https://www.baidu.com"},{"id":8,"title":"Yahoo title 8","link":"https://www.baidu.com"},{"id":9,"title":"Yahoo title 9","link":"https://www.baidu.com"},{"id":10,"title":"Yahoo title 10","link":"https://www.baidu.com"}]`,
    //         category: "1,2,4,",
    //     },
    //     {
    //         name: "Reddit",
    //         content: `[{"id":1,"title":"Reddit title 1","link":"https://www.baidu.com"},{"id":2,"title":"Reddit title 2","link":"https://www.baidu.com"},{"id":3,"title":"Reddit title 3","link":"https://www.baidu.com"},{"id":4,"title":"Reddit title 4","link":"https://www.baidu.com"},{"id":5,"title":"Reddit title 5","link":"https://www.baidu.com"},{"id":6,"title":"Reddit title 6","link":"https://www.baidu.com"},{"id":7,"title":"Reddit title 7","link":"https://www.baidu.com"},{"id":8,"title":"Reddit title 8","link":"https://www.baidu.com"},{"id":9,"title":"Reddit title 9","link":"https://www.baidu.com"},{"id":10,"title":"Reddit title 10","link":"https://www.baidu.com"}]`,
    //         category: "1,2,4,",
    //     },
    // ];

    // websites.forEach(async (item) => {
    //     await connection.query('INSERT INTO `website` (name, content, category, updated_at) VALUES (?, ?, ?, NOW())', [item.name, item.content, item.category]);
    // })

    const [categoryRows, categoryFields] = await connection.execute('SELECT * FROM category');
    console.log(`category ${categoryRows} ${categoryFields}`);

    const [websiteRows, websiteFields] = await connection.execute('SELECT * FROM website');
    console.log(`website ${websiteRows} ${websiteFields}`);

    console.log('Connected to PlanetScale!')
    connection.end()
}

load()

