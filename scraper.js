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

// Check for folder called "data"
if (!fs.existsSync(dataDir)) {
  // If it doesnt exist:
  // Create folder called "data"
  fs.mkdirSync(dataDir);
}

// Log errors to "scraper-error.log" and provide a human friendly message
function errorMessage(error) {
  let errorLog = "\n" + d + ": " + error.message;
  fs.appendFileSync("scraper-error.log", errorLog);
  console.error("Oops, a problem occurred. For more information, see scraper-error.log");
}

// Object to use when scraping info about the tshirts
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

// Object to use when scraping/getting the url for the tshirts
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

// Scrape the individual tshirts using the scrape-it package
// Write the scraped info to a file in the "./data/" folder
// Console.log's a message when complete for user feedback
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
        console.log('Information was gathered and file submitted!');
      });
    }
  });
}

// Loops through the tshirts and scrapes information
const scrapeFunction = (err, page) => {
  try {
    for (let i = 0; i < page.tshirts.length; i++) {
      scrapeTshirtInfo(page.tshirts[i].tshirtLink);
    }
  } catch (error) {
    errorMessage(error);
  }
}

// Starts the scraping of information of tshirts from www.shirts4mike.com
try {
  scrapeIt("http://www.shirts4mike.com/shirts.php", tshirtList, scrapeFunction);
} catch(error) {
  errorMessage(error);
}
