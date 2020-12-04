var connection = require('./../connection');
var express = require('express');

module.exports.addLocation = function(req, res) {
  let location = {
    "name": req.body.name,
    "rooms": req.body.rooms,
    "photo": req.body.photo
  };

  connection.query('INSERT INTO locations SET ?', location, function (error, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
        res.status(200);
        res.send();
    }
  });
}

module.exports.getLocations = function(req, res) {
  connection.query('SELECT * FROM locations', function (error, results, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
       res.status(200);
       res.send({
         results: results
       });
    }
  });
}
