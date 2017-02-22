'use strict';

var express      = require('express');
var bodyParser   = require('body-parser');
var app          = express();
//var cors         = require('cors');
var cohorts      = require('./endpointCohorts.js');
var student      = require('./endpointStudents.js');
var classes      = require('./endpointClasses.js');
var exams        = require('./endpointExams.js');
var examStudent  = require('./endpointStudentsExams.js');
var loginSignup  = require('./endpointLoginSignup.js');
var results      = require('./endpointResults.js');
var runner       = require('./endpointRunner.js');

app.use(bodyParser.json());
// app.use(cors());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    res.header("Access-Control-Allow-Methods", "POST, GET, DELETE, PUT, OPTIONS");
    res.header("Access-Control-Expose-Headers", "headers")
    next();
});

app.post('/login', loginSignup.login);
app.post('/signup', loginSignup.signup);
app.get('/users', loginSignup.userType);

// COHORT requests

app.get('/dashboard/cohorts', cohorts.getCohorts);
app.post('/dashboard/cohorts', cohorts.createCohorts);
app.delete('/dashboard/cohorts/:id', cohorts.deleteCohorts);
app.put('/dashboard/cohorts', cohorts.updateCohorts);

// CLASS requests

app.get('/dashboard/classes', classes.getClasses);
app.post('/dashboard/classes', classes.createClasses);
app.delete('/dashboard/classes/:id', classes.deleteClasses);
app.put('/dashboard/classes', classes.updateClasses);

// EXAM requests

app.get('/dashboard/exams', exams.getExams);
app.get('/dashboard/archived', exams.getArchivedExams);
app.put('/dashboard/exams', exams.updateExams);
app.post('/dashboard/exams', exams.createExams);

// STUDENT REQUESTS

app.get('/dashboard/students', student.getStudents);
app.delete('/dashboard/students/:id', student.deleteStudent);
app.put('/dashboard/students', student.updateStudents);
app.get('/dashboard/unassigned', student.getUnassigned)

// RESULTS

app.get('/dashboard/result/:id', results.getResults);
app.put('/dashboard/result/:exam/:user', results.updateResult);
  
// // STUDENT EXAMS AND RESULTS

app.get('/dashboard/examstart/:id', examStudent.getExams);

//app.post('/dashboard/examstart', examStudent.startExam2);

app.post('/dashboard/examstart', examStudent.startExam);
app.post('/dashboard/previous', examStudent.prevExam);

//app.post('/joblistener', )

var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

