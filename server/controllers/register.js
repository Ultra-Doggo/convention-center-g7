var connection = require('./../connection');
var express = require('express');
var bcrypt = require('bcrypt');

module.exports.register = function(req,res) {
  let hash = bcrypt.hashSync(req.body.password, 10);

  var today = new Date();
  var users = {
    "level": 'person',
    "email": req.body.email,
    "name": req.body.name,
    "password": hash
  }

  connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
  if (error) {
  	res.status(400);
   	res.send(error);
  } else {
	res.status(200);
	res.send();
  }
  });
}
