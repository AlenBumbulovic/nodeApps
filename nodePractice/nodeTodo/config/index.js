var configValues = require('./config');

module.exports = {

    dbConnectionString: function(){
        return 'mongodb://' + configValues.uname + ':' + configValues.pwd 
        + '@ds029635.mlab.com:29635/nodetodotest';
    }
}