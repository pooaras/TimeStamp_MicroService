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

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
// app.get("/api/hello", function (req, res) {
//   res.json({greeting: 'hello API'});
// });

app.get("/api/:date?", (req, res) => {
  //console.log(req.params.date); =>undefined
  const givdate=req.params.date;
  //console.log(givdate); => Invalid Date
  //res.send();
  var date;
  //res.send(givdate);
  if(!givdate) date=new Date();
  else {
        // check if unix time:
        //    number string multiplied by 1 gives this number, data string gives NaN
        const checkUnix = givdate * 1;
        date = isNaN(checkUnix) ? new Date(givdate) : new Date(checkUnix);
      }
  if(date=="Invalid Date"){
    res.json({error:"Invalid Date"})
  }
 else{
  var unix=date.getTime();
  var utc=date.toUTCString();
  res.json({unix,utc})
 }
})

var listener = app.listen(3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
