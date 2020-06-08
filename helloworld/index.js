const fetch = require('node-fetch');
const { webkit } = require('playwright');


module.exports = async function (context, req) {
  
  const browser = await webkit.launch({ headless: true, slowMo: 50 });
  const page = await browser.newPage();
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
  /*
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

  results = {"status":"success"};
  context.res = {
    status: 200,
    body: results
  };
};
