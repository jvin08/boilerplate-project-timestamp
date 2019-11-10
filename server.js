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
  
 if (!userTime || 0 === userTime.length) {
    console.log("Empty")
    unix = new Date().getTime();
    utc = new Date().toUTCString();
    
  } 
  else if (Date.parse(new Date(userTime))) {
    if(!isNaN(Number(userTime))) {
      console.log('integer')
      utc = new Date(parseInt(userTime)).toUTCString();
      unix = new Date(parseInt(userTime)).getTime();
    } else {
      console.log('date')
      utc = new Date(userTime).toUTCString();
      unix = new Date(userTime).getTime();
    }
  } else {
    unix = 'error';
    utc = 'Invalid Date';
  }
  res.send({ unix: unix, utc: utc });
  console.log((new Date(1000)))
  });


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
