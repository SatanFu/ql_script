const cheerio = require("cheerio");
const puppeteer = require('puppeteer');
const { insertWebSite } = require("./db");


const url = "https://www.youtube.com/feed/trending?persist_gl=1&gl=US";


async function getYoutube() {
    let browser
    let page
    try {
        browser = await puppeteer.launch({
            args: ['--no-sandbox']
        })
        page = await browser.newPage()
        await page.goto(url, { timeout: 500 * 1000 })
        const html = await page.content()
        var $ = cheerio.load(html);
        const videos = parseItem($, $("ytd-expanded-shelf-contents-renderer"))
        console.log(JSON.stringify(videos));
        // insertWebSite("Youtube", JSON.stringify(videos), "1,5,")
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

function parseItem($, items) {
    const videos = [];
    const item = items.length >= 2 ? items[1] : items[0]
    const list = $(item).find($("[id='video-title']"))
    list.each((idx, el) => {
        const video = { id: 0, link: "", title: "" };
        video.link = "https://www.youtube.com" + $(el).attr('href').trim();
        video.title = $(el).attr('title').trim();
        video.id = idx + 1;
        videos.push(video);
    })
    return videos
}

getYoutube();