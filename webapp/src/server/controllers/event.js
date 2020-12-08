var connection = require('./../connection');
var express = require('express');

module.exports.createEvent = function(req, res) {
  connection.query('SELECT * FROM users WHERE email = ?',[req.body.email], function (error, results, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
        if(results.length > 0) {
          let admin_id = results[0].user_id;

          let events = {
            "admin_id": admin_id,
            "name": req.body.name,
            "location": req.body.location,
            "description": req.body.description,
            "url": req.body.url,
            "date_time": req.body.date_time,
            "email": req.body.email,
            "approved": "no"
          };

          connection.query('INSERT INTO events SET ?', events, function (error, fields) {
            if (error) {
              res.status(300);
              res.send(error);
            } else {
                res.status(200);
                res.send();
            }
          });
        }
        else {
          res.status(205); // current user doesnt exist
          res.send();
        }
    }
  });
}

module.exports.getAllEvents = function(req, res) {
  connection.query('SELECT * FROM events', function (error, results, fields) {
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
        if (results.length > 0) {
         res.status(200);
         res.send({
           results: results
         });
       } else {
          res.status(205);
          res.send();
       }
    }
  });
}

module.exports.getEventsByPerson = function(req, res) {
  connection.query('SELECT user_id FROM users WHERE email = ?', [req.body.email], function (error, results, fields) {
    if (error) {
      res.status(400);
      res.send();
    } else {
        if (results.length > 0) {
          let user_id = results[0].user_id;
          connection.query('SELECT event_id FROM person WHERE user_id = ?', [user_id], function (error, results, fields) {
            if (error) {
              res.status(400);
              res.send();
            } else {
                var r = [];
                for (let i = 0; i < results.length; i++) {
                  event_id = results[i].event_id;
                  connection.query('SELECT * FROM events WHERE event_id = ?', [event_id], function (error, results, fields) {
                    if (error) {
                      res.status(400);
                      res.send();
                    } else {
                        r.push(results[0]);
                    }
                  });
                }
                connection.query('SELECT event_id FROM person WHERE user_id = ?', [user_id], function (error, results, fields) {
                  if (error) {
                    res.status(400);
                    res.send();
                  } else {
                      res.status(200);
                      res.send({results: r});
                  }
                });
            }
          });
        } else {
            res.status(205);
            res.send();
        }
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
