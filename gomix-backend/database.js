var dataBaseModule = (function () {

  var pg = require('pg');

  var config = {
    host: 'ec2-54-221-217-158.compute-1.amazonaws.com',
    port: 5432,
    database: 'd5tp8i95rn4dog',
    user: 'mkletnrqqxwlih',
    password: 'b8ab3c1c66e2bf5c01ec0822a94622c8660344999fde163b68e8e8aebec21e7f',
    ssl: true,
  };

  var pool =  new pg.Pool(config);


  return {
    pool: pool
  };

})();

module.exports = dataBaseModule;
