//const fetch = require('node-fetch');
const playwright = require('playwright');

const args = {
  "chromium": ["--no-sandbox", "--disable-setuid-sandbox"],
  "firefox": [],
  "webkit": []
}

module.exports = async function(context, req) {
  const { browser: name } = req.query;
  const browser = await playwright[name].launch({
    args: args[name]
  });

  const page = await browser.newPage();
  await page.goto("http://whatsmyuseragent.org/");

  const buffer = (await page.screenshot()).toString("base64");
  await browser.close();

  context.res = {
    status: 200,
    body: `<p>${name}</p><img src="data:image/png;base64, ${buffer}" />`,
    headers: {
      "Content-Type": "text/html"
    }
  };
};

/*
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
  */
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
/*
  await browser.close();

  results = {"status":"success"};
  context.res = {
    status: 200,
    body: results
  };
};
*/