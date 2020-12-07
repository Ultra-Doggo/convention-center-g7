var connection = require('./../connection');
var express = require('express');

module.exports.addPerson = function(req, res) {
  connection.query('SELECT user_id FROM users WHERE email = ?', [req.body.email], function (error, results, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
        if (results.length > 0) {
          let user_id = results[0].user_id;

          let person = {
            "user_id": user_id,
            "event_id": req.body.event_id,
            "rating": "0"
          };
          connection.query('SELECT * FROM person WHERE user_id = ? AND event_id = ?', [user_id, req.body.event_id], function (error, results, fields) {
            if (results.length > 0) {
              res.status(305); // user is already added to this event
              res.send();
            } else {
                connection.query('SELECT * FROM events WHERE admin_id = ? AND event_id = ?', [user_id, req.body.event_id], function (error, results, fields) {
                  if (results.length > 0) {
                    res.status(306); // admin cannot be added to own event
                    res.send();
                  } else {
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
                });
            }
          });
        } else {
            res.status(300); // user doenst exist
            res.send();
        }
    }
  });
}
