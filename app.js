const express = require('express');
const bodyParser = require('body-parser');
const scraping = require('./src/scraper');
const dbConnection = require('./src/db/connection');
const api = require('./src/api/index');
require('dotenv').config();


const app = express();
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

dbConnection.connectionDb();
app.listen(process.env.PORT, () => console.log(`Server started on port  ${process.env.PORT} `));

api.start(app);

setInterval(async () => {
	scraping.scrapingPage();
}, 10000); // 1800000 ms = 30 min || 300000 ms = 5 min   10000
