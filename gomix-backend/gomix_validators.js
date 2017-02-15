var verificationModule = (function () {

var statusSuccess = {result: "success", token: "", user_id: '', user_type: ''};
var statusErr  = {result: "fail", message: "Invalid username or password"};

var setStatusSuccess = function (obj) {
  statusSuccess.user_id = obj.user_id;
  statusSuccess.user_name = obj.user_name;
  statusSuccess.user_type = obj.user_type;  // remove when we have token
  return statusSuccess;
}

var verification = function (req, obj) {
  var result = false
  obj.forEach(function (item) {
    if (item.user_email === req.email && item.user_password === req.password ) {
      statusSuccess.user_id = item.user_id;
      statusSuccess.user_type = item.user_type;
      result = true;
    }
  });
  return result;
};

  var emailValidator = function (email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

  }

  var emailExist = function (req, obj) {
    var result = false;
    obj.forEach(function(item) {
      if (item.user_email === req.email) {
        result = true;
      }
    });
    return result;
  }

  var cohortExist = function (req, obj) {
      var result = false;
      obj.forEach(function(item) {
        if (item.cohort_name === req.cohort_name) {
          result = true;
        }
      });
      return result;
    }

  var classExist = function (req, obj) {
      var result = false;
      obj.forEach(function(item){
        if (item.class_name === req.class_name && item.cohort_id == req.cohort_id) {
          result = true;
        }
      });
      return result;
    }

    return {
      emailExist: emailExist,
      verify: verification,
      emailValid: emailValidator,
      statusSuccess: statusSuccess,
      statusErr: statusErr,
      cohortExist: cohortExist,
      classExist: classExist
    };
})();

module.exports = verificationModule;
