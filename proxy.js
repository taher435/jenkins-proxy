var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var request = require('request');

var config = require('./config.json');

app.use(bodyParser.json());

app.post("/trigger-build", function(req, res){
  var query = req.query;
  var project = query.project;
  var buildToken = query.token;

  if(!project || project === "" || !buildToken || buildToken === ""){
    res.status(400)
    res.send("Bad Request. Project and/or Build Token missing in request parameters.");
    return;
  }

  var triggerUrl = config.jenkins_url + "/job/" + project + "/build?token=" + buildToken;

  var auth = "Basic " + new Buffer(config.user + ":" + config.password).toString("base64");

  var requestOptions = {
    url: triggerUrl,
    headers: {
      'Authorization': auth
    },
    method: "POST"
  }

  var requestCallback = function(error, res, body){    
    console.log("=========== Jenkins Response =============");  
    console.log(body);
  };

  request(requestOptions, requestCallback);

  res.send("success");
});

var server = app.listen(config.port, function(){
  var host = server.address().address;
  var port = server.address().port;

  console.log("Auth app running on port : " + port);
});
