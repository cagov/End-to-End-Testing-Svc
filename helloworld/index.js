const fetch = require('node-fetch');
const playwright = require('playwright');

module.exports = async function (context, req) {
  const browser = await playwright['chromium'].launch({ headless: true, slowMo: 50 });
  const browserContext = await browser.newContext();
  const page = await browserContext.newPage();
  let results = {}
  let passingTests = 0;
  let failedTests = 0;  
  
  function linkCountCheck(count) {
    if(linkCount >= 20) {
      passingTests++;
    } else {
      failedTests++;
    }  
  }
  //HOMEPAGE
  await page.goto('https://covid19.ca.gov/');
  
  let linkCount = await page.evaluate(() => {
    return document.querySelectorAll('a').length
  })
  linkCountCheck(linkCount)
  results.homepage = "homepage number of links: "+linkCount;

  //ROADMAP
  await page.goto('https://covid19.ca.gov/roadmap/');
  
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
  await browser.close();

  
  context.res = {
    status: 200,
    body: results
  };
};
