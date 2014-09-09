var uuid =      require('node-uuid');
var _ =         require('lodash');

var serverlib = require('../lib/server-lib');
var remote =    require('../lib/remote.js');
var respond =   require('../lib/http_utils.js');

module.exports = {
  serverStatus: getServerStatus,
  isConnected: getServerConnected,
  uuid: getUUID
};

function getServerStatus(request, response) {
  serverlib.getStatus(remote, function(error, status) {
    if (error) {
      respond.error(response, error.message);
    } else {
      respond.success(response, _.extend(
        {
          api_documentation_url: 'https://github.com/ripple/ripple-rest'
        },
        status));
    }
  });
};

function getServerConnected(request, response) {
  serverlib.ensureConnected(remote, function(error, status) {
    if (error) {
      respond.error(response, error.message);
    } else {
      respond.success(response, {connected: Boolean(status)});
    }
  });
};

function getUUID(request, response, next) {
  respond.success(response, { uuid: uuid.v4() });
};