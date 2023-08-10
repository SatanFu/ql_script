const dotenv = require('dotenv')
const puppeteer = require('puppeteer')
const { insertWebSite } = require("./db");


const url = "https://news.ycombinator.com/front";


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
        await page.waitForSelector("tr[class=athing]");
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
    return await page.$$eval('tr[class=athing] > td[class=title] > span[class=titleline] > a', divs => divs.map((el, idx) => ({ id: idx + 1, title: el.innerText.trim(), link: el.getAttribute('href') })))
}


getGithub()