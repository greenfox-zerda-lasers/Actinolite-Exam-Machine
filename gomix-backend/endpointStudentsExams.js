var ver = require('./validators.js'); 
var database = require('./database.js');


module.exports = {
  
  getExams: function(req, res) {
    console.log('render exams by id request received')
    database.pool.connect(function(err, client, done) {
      var classid = 0;
      client.query('SELECT class_id FROM users_classes WHERE user_id=($1)', [req.params.id], function(err, result) {
        if (err) {
          console.log(err);
        }
        else {
          classid = result.rows[0];
          // console.log(classid.class_id)
          client.query('SELECT exam_id, exam_name, exam_description, exam_repo, exam_duration, exam_status FROM exams WHERE exam_class_id=($1) AND exam_status=($2)', [classid.class_id, 'live'], function(err, result) {
            if (err) {
              console.log(err);
            }
            else {
              res.json({result: result.rows})
            }
          })
        }
      })
    done();
    })
  },
  
  startExam: function(req, res) {
    console.log('new exam entry request received')
    database.pool.connect(function(err, client, done) {
      client.query('SELECT * FROM solutions', function(err, result) { // first checks if the user has already submitted a repository for this exam, to prevent duplication
        if (ver.resultExist(req.body, result.rows) === false) {
          client.query('INSERT INTO solutions (exam_id, user_id, user_repo) VALUES ($1, $2, $3)', [req.body.exam_id, req.body.user_id, req.body.user_repo], function(err, result2) {
            if (err) {
              console.log(err)
            }
            else {
              res.json({status: "success", message: "Repository was successfully submitted."})
            }
          });
        }
        else {
          res.json({status: "fail", message: "Error: repository already submitted."})
        }
      });
      done();
    });
  },
  
  prevExam: function(req, res) {
    console.log('render previous results request received');
      database.pool.connect(function(err, client, done) {
        client.query('SELECT solutions.exam_id, solutions.user_id, exams.exam_name, exams.exam_auto_score_max, exams.exam_subj_score_max, solutions.exam_auto_score, solutions.exam_subj_score FROM solutions LEFT JOIN exams ON exams.exam_id=solutions.exam_id WHERE solutions.user_id=($1) AND exams.exam_status=($2 OR $3)', [req.body.user_id, 'returned', 'archived'], function(err, result) {
          if (err) {
            console.log(err)
          }
          else {
            res.json({result: result.rows})
          }
        })
      done();
      });
    }
  
// startExam2  
// app.post('/dashboard/examstart', function(req, res) {
//   console.log('new exam start request received')
//   pool.connect(function(err, client, done) {
//     client.query('INSERT INTO solutions (exam_id, user_id, solution_status) VALUES ($1, $2, $3)', [req.body.exam_id, req.body.user_id, 'started'], function(err, result) {
//       if (err) {
//         console.log(err)
//       }
//       else {
//         res.json({status: "success", message: "Exam successfully started."})
//       }
//     });
//     done();
//   });
// });
  
};