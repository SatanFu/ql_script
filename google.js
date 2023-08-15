const puppeteer = require('puppeteer')
const { postWebsite } = require('./http');
const { appendLog } = require('./util');

const url = "https://trends.google.com/trends/trendingsearches/daily?geo=US";


async function getGoogle() {
    appendLog("-----------------google start-------------------\n")
    console.log("-----------------google start-------------------");
    let browser
    let page

    try {
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
        console.log(`google length: ${trendings.length}`);
        const result = await postWebsite(2, "Google", JSON.stringify(trendings), "1,4,")
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
    appendLog("-----------------google end-------------------\n")
    console.log("-----------------google end-------------------");
}

async function getItems(page) {
    return await page.$$eval('div[class=feed-list-wrapper] > md-list > feed-item div.details-wrapper > div.details > div.details-top > div > span', divs => divs.map((el) => (el.innerText)))
}

// getGoogle()

module.exports = {
    getGoogle
}