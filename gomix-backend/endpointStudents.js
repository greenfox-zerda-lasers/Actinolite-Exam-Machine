var ver = require('./validators.js'); 
var database = require('./database.js');


module.exports = {
  
    getStudents: function(req, res) {
    console.log('login request received');
    database.pool.connect(function(err, client, done) {
      client.query('SELECT users.user_id, user_name, classes.class_id, class_name, classes.cohort_id, cohorts.cohort_name FROM users LEFT JOIN users_classes ON users_classes.user_id = users.user_id LEFT JOIN classes ON users_classes.class_id = classes.class_id LEFT JOIN cohorts ON classes.cohort_id = cohorts.cohort_id WHERE users.user_admin = ($1)', ['f'], function(err, result)  {  
          client.query('SELECT * FROM cohorts', function (err, result2){
          if (err) {
            throw err;
          }
          res.json({students: result.rows, cohorts: result2.rows});
        });
    done();
    });
  });
  },
  
   deleteStudent: function(req, res) {
    console.log('students delete request received');
    database.pool.connect(function(err, client, done) {
      client.query('DELETE FROM users WHERE user_id = ($1)', [req.params.id]);
      client.query('DELETE FROM users_classes WHERE user_id = ($1)', [req.params.id]);
      if (err) {
        console.log(err);
        res.json({status:"fail"})
      }
      res.json({status:"success", message: "Student deleted successfully"});
      done();
    });
  },   

  updateStudents: function(req, res) {
   console.log('students class assignment request received');
   database.pool.connect(function(err, client, done) {
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
  },
     
  getUnassigned: function(req, res) {
  database.pool.connect(function(err, client, done) {
    client.query('SELECT users.user_id, users.user_name, users_classes.class_id FROM users LEFT JOIN users_classes ON users_classes.user_id=users.user_id WHERE users_classes.class_id IS NULL AND users.user_admin=($1)', ['f'], function(err, result) {
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
  },
    
//    console.log('students class assignment request received');
//    database.pool.connect(function(err, client, done) {
//    console.log(req.body);
//    client.query('UPDATE users_classes SET class_id=($1) WHERE user_id=($2)', [parseInt(req.body.class_id), req.body.user_id], function(err, result) {
//       //console.log(req.body.class_id)
//       if (err) {
//         console.log(err);
//         res.json({status: "fail", message: "Failed to update student class."})
//       }
//       else {
//         console.log('success');
//         res.json({status: "success", message: "Student class successfully updated."});
//       }
//     });
//     done();
//   });
// },
    
};