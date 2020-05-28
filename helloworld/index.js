const fetch = require('node-fetch');
const { webkit } = require('playwright');
const width = 1200;
const height = 800;
let results = {}

module.exports = async function (context, req) {
const browser = await webkit.launch({ headless: false, slowMo: 50 });
    const page = await browser.newPage();

//HOMEPAGE
    await page.goto('http://covid19.ca.gov/');
    
    const dimensions = await page.evaluate(() => {
      return document.querySelectorAll('a').length
    })
    console.log(dimensions);
    results.homepage = "number of links: "+dimensions;

//ROADMAP

    await page.goto('http://covid19.ca.gov/roadmap/');
    
    const dimensions2 = await page.evaluate(() => {
      return document.querySelectorAll('a').length
    })
    console.log(dimensions2);
    results.roadmap = "number of links2: "+dimensions2;
   
  /* 
  let body = {
    text: "numberoflinks: "+dimensions
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
