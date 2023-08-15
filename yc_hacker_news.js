const puppeteer = require('puppeteer')
const { postWebsite } = require('./http');
const { appendLog } = require('./util');

const url = "https://news.ycombinator.com/front";


async function getYcHackerNews() {
    appendLog("-----------------yc_hacker_news start-------------------\n")
    console.log("-----------------yc_hacker_news start-------------------");
    let browser
    let page

    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        })
        page = await browser.newPage()
        await page.goto(url, { timeout: 500 * 1000 })
        await page.waitForSelector("tr[class=athing]");
        console.log("获取item");
        var trendings = await getItems(page)
        console.log(`yc hacker news length: ${trendings.length}`);
        const result = await postWebsite(6, "HackerNews(YC)", JSON.stringify(trendings), "1,2,")
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
    appendLog("-----------------yc_hacker_news end-------------------\n")
    console.log("-----------------yc_hacker_news end-------------------");
}

async function getItems(page) {
    return await page.$$eval('tr[class=athing] > td[class=title] > span[class=titleline] > a', divs => divs.map((el, idx) => ({ id: idx + 1, title: el.innerText.trim(), link: el.getAttribute('href') })))
}


// getYcHackerNews()

module.exports = {
    getYcHackerNews
}