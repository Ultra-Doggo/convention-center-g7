var connection = require('./../connection');
var express = require('express');

module.exports.createEvent = function(req, res) {
  connection.query('SELECT * FROM users WHERE email = ?',[req.body.email], function (error, results, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
        let admin_id = results[0].user_id;

        let events = {
          "admin_id": admin_id,
          "name": req.body.event_name,
          "description": req.body.description,
          "url": req.body.url,
          "date_time": req.body.date_time,
          "location": req.body.location,
          "email": email,
          "approved": "no"
        };

        connection.query('INSERT INTO events SET ?', events, function (error, fields) {
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

module.exports.getEventsApproved = function(req, res) {
  connection.query('SELECT * FROM events WHERE approved = "yes"', function (error, results, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
       res.status(200);
       res.send({
         results: results
       })
    }
  });
}

module.exports.getEventsByAdmin = function(req, res) {

  connection.query('SELECT * FROM events WHERE email = ?', [req.body.email], function (error, results, fields) {
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

module.exports.getEventsByPerson = function(req, res) {
  connection.query('SELECT event_id FROM person WHERE user_id = ?', [req.body.user_id], function (error, results, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
       let event_id = results[0].event_id;

       connection.query('SELECT * FROM events WHERE event_id = ?', [event_id], function (error, results, fields) {
         res.status(400);
         res.send({
           results: results
         });
       });
    }
  });
}

module.exports.approveEvent = function(req, res) {
  connection.query('UPDATE events SET approved = "yes" WHERE event_id = ?', [req.body.event_id], function (error, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
        res.status(200);
        res.send();
    }
  });
}

module.exports.deleteEvent = function(req, res) {
  // since tables commments and person uses fk of event_id, and the constraint is set to delete on cascade,
  // once the event is deleted from events, it will also delete any entry in comments/person tables.
  connection.query('DELETE FROM events WHERE event_id = ?', [req.body.event_id], function (error, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
        res.status(200);
        res.send();
    }
  });
}
