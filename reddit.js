const puppeteer = require('puppeteer')
const { postWebsite } = require('./http');

const url = "https://www.reddit.com/r/popular/hot/?geo_filter=us";

async function getReddit() {
    console.log("-----------------reddit start-------------------");
    let browser
    let page
    try {
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
        console.log(`reddit length: ${trendings.length}`);
        const result = await postWebsite(4, "Reddit", JSON.stringify(trendings), "1,2,")
        console.log(result.data);
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
    console.log("-----------------reddit end-------------------");
}

async function getItems(page) {
    return await page.$$eval('shreddit-post', divs => divs.map((el, idx) => ({ id: idx + 1, title: el.getAttribute('post-title').trim(), link: `https://www.reddit.com${el.getAttribute('permalink').trim()}` })))
}


// getReddit()

module.exports = {
    getReddit
}