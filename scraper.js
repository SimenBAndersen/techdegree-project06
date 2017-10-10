// Require
const fs = require("fs");              // Node file system
const scrapeIt = require("scrape-it"); // Node.js scraper
const json2csv = require("json2csv");  // Convert from json to csv

// Globals
const dataDir = "./data";
const shirtInfo = []; // Array to store shirt info before converting to CSV
const csvHeaders = ["title", "price", "image", "url", "time"];
const d = new Date();
const time = d.getFullYear() + "-" + (d.getMonth()+1) + "-" + d.getDate();

// time.slice(0,9);
console.log(time);

// Check for folder called "data"
if (!fs.existsSync(dataDir)) {
  // If it doesnt exist:
  // Create folder called "data"
  fs.mkdirSync(dataDir);
}

function errorMessage(error) {
  // log error to file with time stamp
  let errorLog = "\n" + time + " " + error.message;


  // provide human friendly message
  console.error("Ops, a problem occurred. For more information, see scraper-error.log");
}

// If program runs twice:
  // Overwrite CSV file with new information
    // Empty current data folder content
    // Add new files

// If error occurs:
  // Log/append(to end of file) it in a file called "scraper.error.log"
  // Log must show: time and error message
    // [Tue Feb 16 2016 10:02:12 GMT-0800 (PST)] <error message>

// Use third-party npm package (scrape-it) to: Scrape content
  // Visit: http://shirts4mike.com

const tshirtInfo = {
  tshirt: {
    listItem: "#content",
    data: {
      title: ".shirt-details h1",
      price: ".price",
      image: {
        selector: ".shirt-picture img",
        attr: "src"
      }
    }
  }
};

const tshirtList = {
  tshirts: {
    listItem: ".products li",
    data:{
      tshirtLink:{
          selector: 'a',
          attr: 'href'
      }
    }
  }
};

function scrapeTshirtInfo(tshirtLink) {
  let url = "http://www.shirts4mike.com/shirt.php" + tshirtLink.slice(9);
  scrapeIt(url, tshirtInfo, (err, page) => {
    const tempTshirt = {};
    tempTshirt.title = page.tshirt[0].title.slice(4);
    tempTshirt.price = page.tshirt[0].price;
    tempTshirt.image = page.tshirt[0].image;
    tempTshirt.url = url;
    tempTshirt.time = time;
    shirtInfo.push(tempTshirt);
    if (shirtInfo.length === 8) {
      const result = json2csv({data: shirtInfo, fields: csvHeaders});
      fs.writeFile("./data/" + time + ".csv", result, function(err) {
        if (err) throw err;
        console.log('File was submitted');
      });
    }
  });
}

const scrapeFunction = (err, page) => {
  try {
    for (let i = 0; i < page.tshirts.length; i++) {
      scrapeTshirtInfo(page.tshirts[i].tshirtLink);
    }
  } catch (error) {
    console.error(error.message);
  }
}

try {
  scrapeIt("http://www.shirts4mike.com/shirts.php", tshirtList, scrapeFunction);
} catch(error) {
  console.error(error.message);
}

    // If page is down:
      // Show error describing the issue(human friendly) in the console
      // Write error to separate file with time-stamp and error
      // Test this offline..
  // Scrape information for 8 t-shirts from: http://shirts4mike.com/shirts.php
  // without hardcoding urls like: http://www.shirts4mike.com/shirt.php?id=101
    // Get price, title, url and img-url and save to CSV file of correct date

// Use third-party npm package to: Create CSV file
  // CSV file is named for its date: e.g.2016-11-21
  // Column headers / columns in this order: title, price, img-url, url, time
  // Save CSV file inside "data"-folder

// ----- for package.json -----//
// Edit the file so it is ran when "npm start" is ran
// ---------------------------//
