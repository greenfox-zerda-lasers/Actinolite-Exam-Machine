var ver = require('./validators.js'); 
var database = require('./database.js');


module.exports = {
  
  getResults: function(req, res) {
    console.log('results render request received')
    database.pool.connect(function(err, client, done) {
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
  },
  
  updateResult: function(req, res) {
    console.log('setting new subjective score request received')
    database.pool.connect(function(err, client, done) {
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
  },
  
};