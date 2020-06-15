const fetch = require('node-fetch');
// const playwright = require('playwright');
const puppeteer = require('puppeteer');

module.exports = async function (context, req) {
  /*
  const browser = await playwright['chromium'].launch({ headless: true, slowMo: 50 });
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();
  let results = {}
  let passingTests = 0;
  let failedTests = 0;
  */

  let page;
  let browser;
  const width = 1200;
  const height = 800;
  
  browser = await puppeteer.launch({
    headless: true,
    slowMo: 80,
    args: [`--window-size=${width},${height}`]
  });
  page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto("https://covid19.ca.gov");

  
  const links = await page.$$eval('a', anchors => anchors);
  console.log(links)

  browser.close();

  let results = {"status":"success", "links": links.length};
  
  /*
  function linkCountCheck(count) {
    if(linkCount >= 20) {
      passingTests++;
    } else {
      failedTests++;
    }  
  }
  //HOMEPAGE
  await page.goto('http://covid19.ca.gov/');
  
  let linkCount = await page.evaluate(() => {
    return document.querySelectorAll('a').length
  })
  linkCountCheck(linkCount)
  results.homepage = "homepage number of links: "+linkCount;

  //ROADMAP
  await page.goto('http://covid19.ca.gov/roadmap/');
  
  linkCount = await page.evaluate(() => {
    return document.querySelectorAll('a').length
  })
  linkCountCheck(linkCount)
  results.roadmap = "roadmap number of links: "+linkCount;
   
  
  let body = {
    text: `${passingTests} passing tests, ${failedTests} failed Tests`
  };
  
  fetch(process.env["SLACK_PERF_WEBHOOK"], {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  }).then(res => {
    console.log(res);
  });
  */

  
  context.res = {
    status: 200,
    body: results
  };
};
