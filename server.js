const express = require ("express");
const bodyParser = require ("body-parser");
const path = require('path');

const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const routes = require("./controllers/news-scraper.js");

app.use(routes);

app.listen(PORT, function() {
  console.log("Server listening on: http://localhost:" + PORT);
});