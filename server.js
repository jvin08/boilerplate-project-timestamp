// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});



app.get("/api/timestamp/:date_string?", (req, res) => {
  var userTime = req.params.date_string;
  var unix = "";
  var utc = "";
  var jsonObj = {unix: unix, utc: utc}
 if (!userTime || 0 === userTime.length) {
    jsonObj.unix = new Date().getTime();
    jsonObj.utc = new Date().toUTCString();
    res.json(jsonObj);
  } else if(!isNaN(Number(userTime))) {
    jsonObj.utc = new Date(parseInt(userTime)).toUTCString();
    jsonObj.unix = new Date(parseInt(userTime)).getTime();
    res.json(jsonObj);
  } else if (Date.parse(new Date(userTime))) {
    jsonObj.utc = new Date(userTime).toUTCString();
    jsonObj.unix = new Date(userTime).getTime();
    res.json(jsonObj);
  } else if (new Date(userTime).toString() === "Invalid Date") {
    res.json({ error: "Invalid Date" });
  }
  });
