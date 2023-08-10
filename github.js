const dotenv = require('dotenv')
const puppeteer = require('puppeteer')
const { insertWebSite } = require("./db");


const url = "https://github.com/trending?since=daily";


async function getGithub() {

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
        console.log("打开页面完成");
        console.log("等待div");
        await page.waitForSelector("div[class=Box]");
        console.log("获取item");
        var trendings = await getItems(page)
        console.log(JSON.stringify(trendings));
        // await insertWebSite("Github", JSON.stringify(trendings), "6,")
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
    return await page.$$eval('div[class=Box] article[class=Box-row] > h2 > a', divs => divs.map((el, idx) => ({ id: idx + 1, title: el.innerText.trim(), link: `https://github.com${el.getAttribute('href')}` })))
}


getGithub()