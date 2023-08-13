const puppeteer = require('puppeteer');
const { postWebsite } = require('./http');

const url = "https://github.com/trending?since=daily";

async function getGithub() {
    console.log("-----------------github start-------------------");
    let browser
    let page

    try {
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
        console.log(`github length: ${trendings.length}`);

        const result = await postWebsite(1, "Github", JSON.stringify(trendings), "6,")
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
    console.log("-----------------github end-------------------");
}

async function getItems(page) {
    return await page.$$eval('div[class=Box] article[class=Box-row] > h2 > a', divs => divs.map((el, idx) => ({ id: idx + 1, title: el.innerText.trim(), link: `https://github.com${el.getAttribute('href')}` })))
}


// getGithub()

module.exports = {
    getGithub
}