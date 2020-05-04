const fetch = require('node-fetch');
const puppeteer = require("puppeteer");
const width = 1200;
const height = 800;

module.exports = async function (context, req) {
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 80,
    args: [`--window-size=${width},${height}`],
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });

  await page.goto("https://covid19.ca.gov/");
  await page.waitForSelector("h1");
  const links = await page.$$eval("a", (anchors) => anchors);

  let finalOutput = `number of links on page: ${links.length}`;

  let body = {
    text: finalOutput
  };

  fetch(process.env["SLACK_PERF_WEBHOOK"], {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    console.log(res);
  });


  context.res = {
    status: 200,
    body: finalOutput
  };
};
