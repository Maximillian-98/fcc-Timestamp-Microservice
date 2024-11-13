// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date?", function(req, res) {
  dateString = req.params.date;

  // If statements for determining input
  if(/^\d+$/.test(dateString)) { // unix date
    date = new Date(Number(dateString))
  } else if (dateString) { // Standard date
    date = new Date(dateString)
  } else if (!dateString) { // empty date
    date = new Date()
  }
  
  if (isNaN(date.getTime())) {
    return res.json({error: "Invalid Date"})
  }
  
  unixString = date.getTime()
  utcString = date.toUTCString();

  res.json({
    unix: unixString,
    utc: utcString
  })
})



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
