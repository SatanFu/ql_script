const puppeteer = require('puppeteer')
const fs = require('fs')

async function initBrowser() {
    const browser = await puppeteer.launch({
        headless: false,
        args: ['--no-sandbox']
    })

    // 使用puppeteer.connect的方式时就不要关闭浏览器了
    const browserWSEndpoint = browser.wsEndpoint()
    // ws://127.0.0.1:62989/devtools/browser/4eb19a2a-c019-4e2f-b476-9d9a6182e67d
    console.log(browserWSEndpoint)
    const opt = {
        flag: 'w', // a：追加写入；w：覆盖写入
    }
    fs.writeFileSync('browser.data', browserWSEndpoint, opt)
    return browserWSEndpoint
}


async function readBrowserWSEndpoint() {
    try {
        return fs.readFileSync('browser.data').toString()
    } catch (err) {
        return ""
    }
}

module.exports = {
    initBrowser,
    readBrowserWSEndpoint
}