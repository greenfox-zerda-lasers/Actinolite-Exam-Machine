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
  }
}