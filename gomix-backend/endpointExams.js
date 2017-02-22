var ver       = require('./validators.js'); 
var database  = require('./database.js');
var auth      = require('./authenticate.js');

module.exports = {
  
  getExams: function(req, res) {
    database.pool.connect(function(err, client, done) {
      client.query('SELECT exams.exam_id, exams.exam_name, users.user_name, classes.class_name, exams.exam_type, exams.exam_status FROM exams LEFT JOIN users ON exams.exam_creator_id=users.user_id LEFT JOIN classes ON exams.exam_class_id=classes.class_id WHERE exams.exam_status NOT IN ($1) ORDER BY exams.exam_creation_date DESC', ['archived'], function(err, result) {
        if (err) {
          console.log(err);
        }
        else {
          // console.log(result.rows);
          res.json({"exams": result.rows});
        }
      });
      done();
    });
  }, 
  
  getArchivedExams: function(req, res) {
    database.pool.connect(function(err, client, done) {
      client.query('SELECT exams.exam_id, exams.exam_name, users.user_name, classes.class_name, exams.exam_type, exams.exam_status FROM exams LEFT JOIN users ON exams.exam_creator_id=users.user_id LEFT JOIN classes ON exams.exam_class_id=classes.class_id WHERE exams.exam_status = ($1) ORDER BY exams.exam_creation_date DESC', ['archived'], function(err, result) {
        if (err) {
          console.log(err);
        }
        else {
        // console.log(result.rows);
          res.json({"exams": result.rows});
        }
      });
      done();
    });  
  },
  
  updateExams : function(req, res) {
   database.pool.connect(function(err, client, done) {
      client.query('UPDATE exams SET exam_status=($1) WHERE exam_id=($2)', [req.body.exam_status, req.body.exam_id], function(err, result) {
        if (err) {
          console.log(err);
          res.json({result: "fail", message: "Exam status change failed."});
        }
        else {
          // console.log(result);
          res.json({result: "success", message: "Exam status was successfully changed!"});
        }
      });
      done();
    });
  },
    
  createExams: function(req, res) {
    database.pool.connect(function(err, client, done) {
      var classid = 0;
      client.query('SELECT class_id FROM classes WHERE class_name=($1)', [req.body.class_name], function(err, result1) {
        // SEND SPECIFIC ERROR IF DESCRIPTION IS LONGER THAN 250 CHAR
        // console.log(req.body.class_name)
        // console.log(result1);
        this.classid = result1.rows[0].class_id;
        client.query('INSERT INTO exams (exam_name, exam_description, exam_duration, exam_repo, exam_creator_id, exam_class_id, exam_type) VALUES ($1, $2, $3, $4, $5, $6, $7)', [req.body.exam_name, req.body.exam_desc, req.body.exam_duration, req.body.exam_repo, req.body.exam_creator_id, this.classid, req.body.exam_type], function (err, result2) {
          if (err) {
            console.log(err);
            res.json({result: "fail", message: "Adding new exam/workshop failed."});
          }
          else {
            res.json({result: "success", message: "Successfully added new exam!"});
          }
        });
      });
      done();
    });
    }
};