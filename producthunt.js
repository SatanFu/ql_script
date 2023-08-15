const puppeteer = require('puppeteer')
const { postWebsite } = require('./http');
const { appendLog } = require('./util');

const url = "https://producthunt-trending.js.org/?range=daily";

async function getProductHunt() {
    console.log("-----------------producthunt start-------------------");
    appendLog("-----------------producthunt start-------------------\n")
    let browser
    let page
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        })
        page = await browser.newPage()
        await page.goto(url, { timeout: 500 * 1000 })
        await page.waitForSelector("div[class=item]");
        await page.waitForNetworkIdle({ idleTime: 1500 });
        var trendings = await getItems(page)
        console.log(`producthunt length: ${trendings.length}`);
        const result = await postWebsite(3, "ProductHunt", JSON.stringify(trendings), "1,7,")
        console.log(result.data);
        appendLog(`${result.data}\n`)
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
    appendLog("-----------------producthunt end-------------------\n")
    console.log("-----------------producthunt end-------------------");
}

async function getItems(page) {
    return await page.$$eval('div[class=item] div[class=item-container]', divs => divs.map((el, idx) => ({ id: idx + 1, title: el.querySelector('div[class=body] > div[class=main] > div[class=main-text] > h5 > a').innerText, link: el.querySelector('div[class=footer] > a').getAttribute('href') })))
}

// getProductHunt()

module.exports = {
    getProductHunt
}