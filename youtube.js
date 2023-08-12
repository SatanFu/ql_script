const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const { insertWebSite } = require("./db");
const { writeFile, readFile } = require("./util");


const url = "https://www.youtube.com/feed/trending?persist_gl=1&gl=US";


async function getYoutube() {
    let browser
    let page
    try {
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        })
        page = await browser.newPage()
        await page.goto(url, { timeout: 500 * 1000 })
        await page.waitForSelector("ytd-item-section-renderer");
        await page.waitForNetworkIdle({ idleTime: 1500 });
        var trendings = await getItems(page)
        console.log(JSON.stringify(trendings));
        // await writeFile("twitter.json", JSON.stringify(trendings), "w")
        // insertWebSite("Youtube", JSON.stringify(trendings), "1,5,")
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
    var videos = [];
    let renderers = await page.$$('ytd-item-section-renderer ytd-shelf-renderer')
    for (let i = 0; i < renderers.length; i++) {
        const item = await renderers[i].$('div[id=title-container][hidden]')
        if (item) {
            const list = await renderers[i].$$eval('ytd-video-renderer a[id=video-title]', divs => divs.map((el, idx) => ({ title: el.getAttribute('title').trim(), link: `https://www.youtube.com${el.getAttribute('href').trim()}` })))
            videos = videos.concat(list)
        }
    }
    return videos.filter(function (item, index, self) {
        return self.findIndex((el) => el.title == item.title && el.link == item.link) == index;
    }).map((item, idx) => ({
        id: idx + 1,
        title: item.title,
        link: item.link
    }));
}

getYoutube();