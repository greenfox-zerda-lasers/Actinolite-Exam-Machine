var ver = require('./validators.js');
var database = require('./database.js');


module.exports = {

    getCohorts: function(req, res) {
    console.log('login request received');
    database.pool.connect(function(err, client, done) {
      client.query('SELECT * FROM cohorts ORDER BY cohort_id DESC', function(err, result) {
        if (err) {
          console.log(err);
        }
        res.json({"cohorts": result.rows});
      });
    done();
    });
  },

  createCohorts : function(req, res) {
    console.log('Cohort create request recieved');
    database.pool.connect(function(err, client, done) {
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
  },

  deleteCohorts : function(req, res) {
    console.log('delete request received');
    console.log(req.params.id);
    database.pool.connect(function(err, client, done) {
      client.query('DELETE FROM cohorts WHERE cohort_id = ($1)', [req.params.id], function(err, result) {
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
  },

  updateCohorts : function(req, res) {
    console.log('put request received');
    database.pool.connect(function(err, client, done) {
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
  }
};
