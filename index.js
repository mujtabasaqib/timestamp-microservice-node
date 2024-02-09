// init project
var express = require('express');
var app = express();

// enable CORS 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});


// first API endpoint
app.get("/api/hello", (req, res) => {
  res.json({greeting: 'hello API'});
});

// date time for now
app.get("/api", (req, res) => {
  let date = new Date();
  res.json({unix: date.getTime(), utc: date.toUTCString()});
});

// date reqs
app.get('/api/:date', (req, res) => {
  let date = req.params.date; //input date

  const invalidDate = (unix,utc) => {
    if(unix===null || utc ==="Invalid Date"){
       return true;
    }
  }

  // if the passed string has a dash, comma or slash it is a date according to format
  if(date.includes("-") || date.includes("/") || date.includes(",")){
    let unix = new Date(date).getTime();
    let utc = new Date(date).toUTCString();
    if(invalidDate(unix,utc)){
      res.json({ error : "Invalid Date" });
    }
    else{
      res.json({unix: unix, utc: utc});
    }
  }
  // if the passed string is a unix timestamp
  else {
    let unix = parseInt(date);
    let utc = new Date(unix).toUTCString();
    if(invalidDate(unix,utc)){
      res.json({ error : "Invalid Date" });
    }
    else{
      res.json({unix: unix, utc: utc});
    }
  }
});

// listen for requests
var listener = app.listen(process.env.PORT, function () {
  console.log('App is listening on port ' + listener.address().port);
});
