var connection = require('./../connection');
var express = require('express');

module.exports.addPerson = function(req, res) {
  let person = {
    "user_id": req.body.user_id,
    "event_id": req.body.event_id,
  };

  connection.query('INSERT INTO person SET ?', person, function (error, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
        res.status(200);
        res.send();
    }
  });
}
