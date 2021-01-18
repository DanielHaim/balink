const express = require('express');
const bodyParser = require('body-parser');
const basicAuth = require('express-basic-auth');
const countries = require('./countries');

const app = express();
const port = process.env.PORT || 5000;
const username = "danielHaim"
const password = "balink"

// Allow cors
const allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS'); // allow these verbs
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Authorization");
  res.header("Access-Control-Allow-Credentials", true);
  if ('OPTIONS' == req.method) {
    res.send(200);
  }else{
    next();
  }
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(allowCrossDomain);

// Basic Auth
app.use(basicAuth({
  users: { [username]: password },
  challenge: true
}))

const decode64 = (b64Encoded) => {
 const result = new Buffer.from(b64Encoded, 'base64').toString();
 return result;
}


// For this method i used manual verification to implement basic auth
app.get('/api/countries', (req, res) => {
  if(req.headers.authorization){
    const auth64 = (req.headers.authorization).replace('Basic ','');
    const authorisation = decode64(auth64);
    if(authorisation == `${username}:${password}`) {
      res.send({ express: {countries: countries }});
    }
    else{
      res.status(401).send('missing authorization header');
    }
  }
  else{
    res.status(401).send('missing authorization header');
  }
  
});


// For this method i use basic-auth library to control unhautorised request
app.post('/api/addSubscriber', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

app.listen(port, () => console.log(`Listening on port ${port}`));