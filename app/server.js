let express = require('express');
let path = require('path');
let fs = require('fs');
let bodyParser = require('body-parser');

// const { setupTracing }  = require('./tracing')

// setupTracing()

let app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());


app.get('/ping', function(req, res){
  console.log('/ping called')
  console.log(`process.env.OTEL_LOG_LEVEL: ${process.env.OTEL_LOG_LEVEL}`)
  res.send({'ping': 'pong'})
})

app.listen(3000, function () {
  console.log("app listening on port 3000!");
});

