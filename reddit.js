const dotenv = require('dotenv')
const puppeteer = require('puppeteer')
const { insertWebSite } = require("./db");

const url = "https://www.reddit.com/r/popular/hot/?geo_filter=us";

async function getReddit() {
    let browser
    let page
    try {
        dotenv.config()
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        })
        page = await browser.newPage()
        await page.goto(url, { timeout: 500 * 1000 })
        await page.waitForSelector("shreddit-post");

        await page.evaluate(() => {
            window.scrollBy(0, document.body.scrollHeight);
        })
        await page.waitForSelector("faceplate-batch")
        var trendings = await getItems(page)
        console.log(JSON.stringify(trendings));
        // await insertWebSite("Twitter", JSON.stringify(trendings), "1,2,")
    } catch (err) {
        console.error(err);
    } finally {
        if (page != null) {
            await page.close()
        }
        if (browser != null) {
            await browser.close()
        }
    }
}

async function getItems(page) {
    return await page.$$eval('shreddit-post', divs => divs.map((el, idx) => ({ id: idx + 1, title: el.getAttribute('post-title').trim(), link: `https://www.reddit.com${el.getAttribute('permalink').trim()}` })))
}


getReddit()

// const axios = require("axios");
// const cheerio = require("cheerio");
// const tunnel = require('tunnel');
// const { insertWebSite } = require("./db");

// const url = "https://www.reddit.com/r/popular/hot/";
// // 代理设置
// const agent = tunnel.httpsOverHttp({
//     proxy: {
//         host: '127.0.0.1',
//         port: 7890,
//     }
// });


// async function scrapeData() {
//     try {
//         var res = await axios.request({
//             url: url,
//             method: 'get',
//             httpsAgent: agent,
//             proxy: false,
//         });
//         var $ = cheerio.load(res.data);
//         var posts = [];
//         posts = posts.concat(parseItem($, $("shreddit-post")))
//         const loadMoreLink = "https://www.reddit.com" + $("main div faceplate-partial").attr('src')
//         res = await axios.request({
//             url: loadMoreLink,
//             method: 'get',
//             httpsAgent: agent,
//             proxy: false,
//         });
//         $ = cheerio.load(res.data);
//         posts = posts.concat(parseItem($, $("faceplate-batch shreddit-post")))
//         console.log(posts.length);
//         await insertWebSite("Reddit", JSON.stringify(posts), "1,2,4,")
//     } catch (err) {
//         console.error(err);
//     }
// }

// function parseItem($, items) {
//     const posts = [];
//     items.each((idx, el) => {
//         const post = { id: 0, link: "", title: "" };
//         // post.link = "https://www.reddit.com" + $(el).find($("[slot='full-post-link']")).attr('href').trim();
//         post.link = "https://www.reddit.com" + $(el).attr('permalink').trim();
//         post.title = $(el).attr('post-title').trim();
//         post.id = $(el).attr('id').trim();
//         posts.push(post);
//     });
//     return posts
// }

// scrapeData();