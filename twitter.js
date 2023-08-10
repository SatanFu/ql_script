const dotenv = require('dotenv')
const puppeteer = require('puppeteer')
const { writeFile, readFile } = require("./util");
const { insertWebSite } = require("./db");


const url = "https://twitter.com/explore/tabs/trending";


async function getTwitter() {

    let browser
    let page

    try {
        dotenv.config()
        browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox']
        })
        page = await browser.newPage()

        const cookiesJson = await readFile("cookies.json")
        if (cookiesJson != null && cookiesJson.length > 0) {
            console.log("设置cookie");
            const cookies = JSON.parse(cookiesJson)
            for (let i = 0; i < cookies.length; i++) {
                await page.setCookie(cookies[i]);
            }
        }

        await page.goto(url, { timeout: 500 * 1000 })
        // await page.waitForNetworkIdle({ idleTime: 500 });
        const signInToText = await page.$eval("*", (el) => el.innerText);
        if (signInToText.includes("Sign in to") || signInToText.includes("注册")) {
            console.log("跳转登录");
            await page.waitForSelector("[autocomplete=username]");
            await page.type("input[autocomplete=username]", process.env.TWITTER_EMAIL, { delay: 50 });
            await page.keyboard.press('Enter');

            // await page.waitForNetworkIdle({ idleTime: 500 });
            const extractedText = await page.$eval("*", (el) => el.innerText);
            if (extractedText.includes("Enter your phone number or username") || extractedText.includes("输入你的手机号码或用户名")) {
                await page.waitForSelector("[autocomplete=on]");
                await page.type("input[autocomplete=on]", process.env.TWITTER_USER, { delay: 50 });
                await page.keyboard.press('Enter');
            }

            // await page.waitForNetworkIdle({ idleTime: 500 });
            await page.waitForSelector("[autocomplete=current-password]");
            await page.type("input[autocomplete=current-password]", process.env.TWITTER_PASSWORD, { delay: 50 });
            await page.keyboard.press('Enter');
        }
        console.log("登录成功");


        await page.waitForSelector("[data-testid=cellInnerDiv]");
        await page.waitForNetworkIdle({ idleTime: 1500 });
        var items = await getItems(page)

        await page.evaluate(() => {
            window.scrollBy(0, document.body.scrollHeight);
        })
        await page.waitForNetworkIdle({ idleTime: 1500 });
        items = items.concat(await getItems(page))

        const cookie = await page.cookies(url)
        await writeFile("cookies.json", JSON.stringify(cookie), "w")

        const trendings = items.filter(function (item, index, self) {
            return self.indexOf(item) == index;
        }).map((item, idx) => ({
            id: idx + 1,
            title: item,
            link: `https://twitter.com/search?q=${encodeURIComponent(item)}&src=trend_click&vertical=trends`
        }));
        console.log(JSON.stringify(trendings));
        // await insertWebSite("Twitter", JSON.stringify(trendings), "1,3,")
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
    return await page.$$eval('div[data-testid=cellInnerDiv] div.css-901oao.r-18jsvk2.r-37j5jr.r-a023e6.r-b88u0q.r-rjixqe.r-1bymd8e.r-bcqeeo.r-qvutc0 > span', divs => divs.map((el) => (el.innerText)))
}


getTwitter();