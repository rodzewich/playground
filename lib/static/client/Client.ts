import IClient    = require("./IClient");
import ClientBase = require("../../client/Client");
import log4js     = require("../../../logger");

var logger:log4js.Logger = log4js.getLogger("memory");

class Client extends ClientBase implements IClient {

}

export = Client;
