const dotenv = require('dotenv')
const puppeteer = require('puppeteer')
const { insertWebSite } = require("./db");


const url = "https://trends.google.com/trends/trendingsearches/daily?geo=US";


async function getGoogle() {

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
        await page.waitForSelector("div[class=feed-list-wrapper]");
        await page.waitForNetworkIdle({ idleTime: 1500 });
        var items = await getItems(page)
        const trendings = items.map((item, idx) => ({
            id: idx + 1,
            title: item,
            link: `https://trends.google.com/trends/trendingsearches/daily?geo=US&tt=${encodeURIComponent(item)}#${encodeURIComponent(item)}`
        }));
        console.log(JSON.stringify(trendings));
        // await insertWebSite("Twitter", JSON.stringify(trendings), "4,")
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
    return await page.$$eval('div[class=feed-list-wrapper] > md-list > feed-item div.details-wrapper > div.details > div.details-top > div > span', divs => divs.map((el) => (el.innerText)))
}

getGoogle()