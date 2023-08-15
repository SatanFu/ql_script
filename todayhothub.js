const { getGithub } = require("./github")
const { getGoogle } = require("./google")
const { getProductHunt } = require("./producthunt")
const { getReddit } = require("./reddit")
const { getTwitter } = require("./twitter")
const { getYcHackerNews } = require("./yc_hacker_news")
const { getYoutube } = require("./youtube")


async function load() {
    await getGithub()
    await getGoogle()
    await getProductHunt()
    await getReddit()
    await getTwitter()
    await getYcHackerNews()
    await getYoutube()
}

load()
