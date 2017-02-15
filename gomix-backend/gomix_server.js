'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var pg = require('pg');
var cors = require('cors');

var ver = require('./gomix_validators')
app.use(bodyParser.json());
app.use(cors());

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
// });

var config = {
  host: 'ec2-54-221-217-158.compute-1.amazonaws.com',
  port: 5432,
  database: 'd5tp8i95rn4dog',
  user: 'mkletnrqqxwlih',
  password: 'b8ab3c1c66e2bf5c01ec0822a94622c8660344999fde163b68e8e8aebec21e7f',
  ssl: true,
};

var pool = new pg.Pool(config);

app.post('/user/login', function(req, res) {
   console.log('login request received');
   pool.connect(function(err, client, done) {
    client.query('SELECT * FROM users', function(err, result) {
    // console.log(result.rows);
    // console.log('valami', req.body)
      if (err) {
        console.log(err);
      }
      else if (ver.verify(req.body, result.rows)){
        res.json(ver.statusSuccess);
      } else {
        res.json(ver.statusErr);
      }
    });
    done();
  });
});

app.post('/user/signup', function(req, res) {
 pool.connect(function(err, client, done) {
   client.query('SELECT * FROM users', function(err, result) {
    if (err) {
      console.log(err);
    }
    if (ver.emailValid(req.body.user_email) === true && ver.emailExist(req.body, result.rows) === false) {
      client.query('INSERT INTO users (user_email, user_name, user_password) VALUES ($1, $2, $3)', [req.body.user_email, req.body.user_name, req.body.user_password], function(err) {
        if (err) {
          console.log(err)
        }
        else {
          client.query('SELECT user_id FROM users WHERE user_name=($1)', [req.body.user_name], function(err, result2) {
            if (err) {
              console.log(err);
            }
            else {
              client.query('INSERT INTO users_classes (user_id) VALUES ($1)', [result2.rows[0].user_id]);
            }
          })
          res.json({result: "success", token: "A-Z", "id": 431});
        }
      });
    } else {
      res.json({"result": "Fail", "message": "Email address already exists."});
    }
    });
    done();
  });
});

// USER requests

app.get('/users', function(req, res) {
  pool.connect(function(err, client, done) {
    client.query('SELECT user_id, user_name, user_type FROM users', function (err, result) {
      if (err) {
        console.log(err);
      }
      else {
        // console.log(result.rows);
        res.json({"users": result.rows});
      }
    });
  done();
  });
});

// COHORT requests

app.get('/dashboard/cohorts', function(req, res) {
  console.log('login request received');
  pool.connect(function(err, client, done) {
    client.query('SELECT * FROM cohorts ORDER BY cohort_id DESC', function(err, result) {
      if (err) {
        console.log(err);
      }
      res.json({"cohorts": result.rows});
    });
    done();
  });
});

app.post('/dashboard/cohorts', function(req, res) {
  console.log('Cohort create request recieved');
  console.log(req.body);
  pool.connect(function(err, client, done) {
    client.query('SELECT * FROM cohorts', function(error, result) {
      if (ver.cohortExist(req.body, result.rows) === false) {
        client.query('INSERT INTO cohorts (cohort_name) VALUES ($1)', [req.body.cohort_name], function(err) {
          if (err) {
            console.log(err);
            res.json({status:"fail"})
          } else {
            res.json({status:"success", message: "Cohort created successfully"});
          }
        });
      } else {
          res.json({status: "fail", message: "Cohort name already exists"});
      }
    });
    done();
  });
});

app.delete('/dashboard/cohorts/:id', function(req, res) {
   console.log('delete request received');
   pool.connect(function(err, client, done) {
    client.query('DELETE FROM cohorts WHERE cohort_id =  ($1)', [req.params.id], function(err, result) {
      if (err) {
        console.log(err);
        res.json({status:"fail", massage: 'Unknown error occured'})
      }
      else {
        res.json({status:"success", message: "Cohort deleted successfully"});
      }
    });
    done();
  });
});

app.put('/dashboard/cohorts', function(req, res) {
  console.log('put request received');
  pool.connect(function(err, client, done) {
    client.query('SELECT * FROM cohorts', function(error, result) {
      if (ver.cohortExist(req.body, result.rows) === false) {
        client.query('UPDATE cohorts SET cohort_name = ($1) WHERE cohort_id = ($2)', [req.body.cohort_name, req.body.cohort_id]);
        if (err) {
          console.log(err);
          res.json({status:"fail"})
        }
        res.json({status: "success", message: "Cohort updated successfully"});
      } else {
          res.json({status: "fail", message: "Cohort name already exists"});
      }
    });
    done();
  });
});


// CLASS requests

app.get('/dashboard/classes', function(req, res) {
  console.log('classes render request received');
  pool.connect(function(err, client, done) {
    client.query('SELECT * FROM classes LEFT JOIN cohorts ON classes.cohort_id = cohorts.cohort_id ORDER BY class_id DESC', function(err, result) {
      client.query('SELECT * FROM cohorts', function (err, result2){
        if (err) {
          console.log(err);
        }
        res.json({classes: result.rows, cohorts: result2.rows});
      });
    });
  done();
  });
});

app.delete('/dashboard/classes/:id', function(req, res) {
  console.log('class delete request received');
  pool.connect(function(err, client, done) {
    client.query('DELETE FROM classes WHERE class_id = ($1)', [req.params.id]);
    if (err) {
      console.log(err);
      res.json({status:"fail"})
    }
    res.json({status:"success", message: "Class deleted successfully"});
    done();
  });
});

app.put('/dashboard/classes', function(req, res) {
  console.log('class edit request received');
  pool.connect(function(err, client, done) {
    client.query('SELECT * FROM classes', function(err, result) {
      console.log(ver.classExist(req.body, result.rows));
      console.log(req.body);
      if (ver.classExist(req.body, result.rows) === false) {
        client.query('UPDATE classes SET class_name = ($1), cohort_id = ($2) WHERE class_id = ($3)', [req.body.class_name, req.body.cohort_id, req.body.class_id]);
        if (err) {
        console.log(err);
        }
        res.json({status:"success", message: "Class edited successfully"});
      } else {
          res.json({status: "fail", message: "Class name already exists"});
      }
    });
    done();
  });
});

app.post('/dashboard/classes', function(req, res) {
  console.log('create class request received');
  console.log(req.body);
  pool.connect(function(err, client, done) {
    client.query('SELECT * FROM classes', function (err, result) {
      if (ver.classExist(req.body, result.rows) === false) {
        client.query('INSERT INTO classes (class_name, cohort_id) VALUES ($1, $2)', [req.body.class_name, req.body.cohort_id]);
        if (err) {
          console.log(err);
        }
        res.json({status: "success", message: "Class created successfully"});
      } else {
        res.json({status: "fail", message: "Class name already exsits"});
      }
    });
    done();
  });
});

// EXAM requests

app.get('/dashboard/exams', function(req, res) {
  pool.connect(function(err, client, done) {
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
});

app.get('/dashboard/archived', function(req, res) {
  pool.connect(function(err, client, done) {
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
});

app.put('/dashboard/exams', function(req, res) {
  pool.connect(function(err, client, done) {
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
});

app.post('/dashboard/exams', function(req, res) {
  pool.connect(function(err, client, done) {
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
});

// STUDENT REQUESTS

app.get('/dashboard/students', function(req, res){
  pool.connect(function(err, client, done){
    client.query('SELECT users.user_id, user_name, classes.class_id, class_name, classes.cohort_id, cohorts.cohort_name FROM users LEFT JOIN users_classes ON users_classes.user_id = users.user_id LEFT JOIN classes ON users_classes.class_id = classes.class_id LEFT JOIN cohorts ON classes.cohort_id = cohorts.cohort_id WHERE users.user_type = ($1)', ['student'], function(err, result) {
      client.query('SELECT * FROM cohorts', function (err, result2){
        if (err) {
        console.log(err);
      }
      res.json({students: result.rows, cohorts: result2.rows});
      });
    });
    done();
  });
});

app.delete('/dashboard/students/:id', function(req, res) {
   console.log('students delete request received');
   pool.connect(function(err, client, done) {
    client.query('DELETE FROM users WHERE user_id = ($1)', [req.params.id]);
    client.query('DELETE FROM users_classes WHERE user_id = ($1)', [req.params.id]);
    if (err) {
      console.log(err);
      res.json({status:"fail"})
    }
    res.json({status:"success", message: "Student deleted successfully"});
    done();
  });
});

app.put('/dashboard/students', function(req, res) {
   console.log('students class assignment request received');
   pool.connect(function(err, client, done) {
   console.log(req.body);
   client.query('UPDATE users_classes SET class_id=($1) WHERE user_id=($2)', [parseInt(req.body.class_id), req.body.user_id], function(err, result) {
      //console.log(req.body.class_id)
      if (err) {
        console.log(err);
        res.json({status: "fail", message: "Failed to update student class."})
      }
      else {
        console.log('success');
        res.json({status: "success", message: "Student class successfully updated."});
      }
    });
    done();
  });
});

app.get('/dashboard/unassigned', function(req, res) {
  pool.connect(function(err, client, done) {
    var type = 'student';
    client.query('SELECT users.user_id, users.user_name, users_classes.class_id FROM users LEFT JOIN users_classes ON users_classes.user_id=users.user_id WHERE users_classes.class_id IS NULL AND users.user_type=($1)', [type], function(err, result) {
      if (err) {
        console.log(err);
      }
      else {
        // console.log(result.rows);
        res.json({students: result.rows});
      }
    });
    done();
  });
});

// RESULTS

app.get('/dashboard/result/:id', function(req, res){
  console.log('results render request received')
  pool.connect(function(err, client, done) {
    client.query('SELECT solutions.exam_id, exams.exam_name, solutions.user_id, users.user_name, classes.class_name, solutions.user_repo, solutions.exam_auto_score, solutions.exam_subj_score, exams.exam_auto_score_max, exams.exam_subj_score_max, cohorts.cohort_name FROM solutions LEFT JOIN exams ON solutions.exam_id=exams.exam_id LEFT JOIN users ON solutions.user_id=users.user_id LEFT JOIN users_classes ON solutions.user_id=users_classes.user_id LEFT JOIN classes ON users_classes.class_id=classes.class_id LEFT JOIN cohorts ON classes.cohort_id=cohorts.cohort_id WHERE solutions.exam_id=($1)', [req.params.id], function(err, result){
      if (err) {
        console.log(err);
      }
      else {
        console.log(result.rows);
        res.json({results: result.rows});
      }
    });
    done();
  });
});

app.put('/dashboard/result/:exam/:user', function(req, res) {
  console.log('setting new subjective score request received')
  pool.connect(function(err, client, done) {
    client.query('UPDATE solutions SET exam_subj_score=($1) WHERE exam_id=($2) AND user_id=($3)', [req.body.score, req.params.exam, req.params.user], function(err, result) {
      if (err) {
        console.log(err);
        res.json({status: 'fail', message: 'Failed to record new score.'})
      }
      else {
        res.json({status: 'success', message: 'New score successfully recorded.'})
      }
    });
    done();
  });
});

// STUDENT EXAMS AND RESULTS

app.get('/dashboard/examstart/:id', function(req, res) {
  console.log('render exams by id request received')
  pool.connect(function(err, client, done) {
    var classid = 0;
    client.query('SELECT class_id FROM users_classes WHERE user_id=($1)', [req.params.id], function(err, result) {
      if (err) {
        console.log(err);
      }
      else {
        classid = result.rows[0];
        // console.log(classid.class_id)
        client.query('SELECT exams.exam_id, exams.exam_name, exams.exam_description, exams.exam_repo, exams.exam_duration FROM exams WHERE exams.exam_class=($1)', [classid.class_id], function(err, result) {
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
})

// var listener = app.listen(process.env.PORT, function () {
//   console.log('Your app is listening on port ' + listener.address().port);
// });

module.exports = app;
app.listen(5000);
