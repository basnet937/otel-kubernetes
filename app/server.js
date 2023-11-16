let express = require('express');
let bodyParser = require('body-parser');


let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.get('/ping', function(req, res){
  console.log('/ping called')
  res.send({'ping': 'pong'})
})

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

app.get('/rolldice', (req, res) => {
  console.log('/rolldice called')
  res.send(getRandomNumber(1, 6).toString());
});

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});

