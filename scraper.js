// Require
const fs = require("fs");

// Globals
const dataDir = "./data";

// Check for folder called "data"
  // If it doesnt exist:
if (!fs.existsSync(dataDir));
    // Create folder called "data"
    fs.mkdirSync(dataDir);
    console.log(fs.existsSync(dataDir));

// If program runs twice:
  // Overwrite CSV file with new information

// If error occurs:
  // Log/append(to end of file) it in a file called "scraper.error.log"
  // Log must show: time and error message
    // [Tue Feb 16 2016 10:02:12 GMT-0800 (PST)] <error message>

// Use third-party npm package to: Scrape content
  // Visit: http://shirts4mike.com
    // If page is down:
      // Show error describing the issue(human friendly) in the console
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
