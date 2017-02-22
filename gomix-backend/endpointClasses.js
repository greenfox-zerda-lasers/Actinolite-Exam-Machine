var ver = require('./validators.js');
var database = require('./database.js');


module.exports = {

    getClasses: function(req, res) {
    console.log('login request received');
    console.log('classes render request received');
      database.pool.connect(function(err, client, done) {
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
    },

  createClasses : function(req, res) {
      console.log('create class request received');
      database.pool.connect(function(err, client, done) {
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
    },

  deleteClasses : function(req, res) {
    console.log('class delete request received');
    database.pool.connect(function(err, client, done) {
      client.query('DELETE FROM classes WHERE class_id = ($1)', [req.params.id]);
      if (err) {
        console.log(err);
        res.json({status:"fail"})
      }
      res.json({status:"success", message: "Class deleted successfully"});
      done();
    });
  },

  updateClasses : function(req, res) {
    console.log('class edit request received');
    database.pool.connect(function(err, client, done) {
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
  }
};
