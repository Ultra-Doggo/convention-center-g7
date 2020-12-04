var connection = require('./../connection');
var express = require('express');

module.exports.addComment = function(req, res) {
  let now = new Date();

  let comment = {
    "user_id": req.body.user_id,
    "event_id": req.body.event_id,
    "comment": req.body.comment,
    "date_added": now
  };

  connection.query('INSERT INTO comments SET ?', comment, function (error, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
        res.status(200);
        res.send();
    }
  });
}

module.exports.getComments = function(req, res) {
  connection.query('SELECT * FROM comments WHERE event_id = ?', [req.body.event_id], function (error, results, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
        res.status(200);
        res.send();
    }
  });
}
