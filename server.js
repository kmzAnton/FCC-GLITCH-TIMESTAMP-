var express = require('express');
var app = express();
var months = new Array(	"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

app.use(express.static('public'));

app.get('/:date', function(req,res){
  var date = req.params.date;
  
  if (isNaN(date)){
    date = new Date(date);
    if(date!='Invalid Date'){
      // console.log(date);
      
      res.json({'unix': (date.getTime()/1000).toFixed(0), 'natural':months[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear()});
    } else {
      res.json({'unix':null, 'natural':null});
    }
  } else {
    date = new Date(Number(date*1000));
    res.json({'unix': Number(date), 'natural':months[date.getMonth()]+' '+date.getDate()+', '+date.getFullYear()});
  }
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});

app.listen(process.env.PORT);