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
    console.log("Empty")
    jsonObj.unix = new Date().getTime();
    jsonObj.utc = new Date().toUTCString();
    
  } else if(!isNaN(Number(userTime))) {
      console.log('integer')
      jsonObj.utc = new Date(parseInt(userTime)).toUTCString();
      jsonObj.unix = new Date(parseInt(userTime)).getTime();
  } else if (Date.parse(new Date(userTime))) {
      console.log('date')
      jsonObj.utc = new Date(userTime).toUTCString();
      jsonObj.unix = new Date(userTime).getTime();
  } else {
    console.log("ERROR")
    jsonObj = {"error": "Invalid Date"}
  }
  res.send(jsonObj);
  });

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
