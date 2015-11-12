import IManager    = require("./IManager");
import IOptions    = require("./IOptions");
import ManagerBase = require("../../css/manager/Manager");
import IClient     = require("../client/IClient");
import Client      = require("../client/Client");

class Manager extends ManagerBase {

    constructor(options:IOptions) {
        super(options);
    }

    protected createClient(location:string):IClient {
        return new Client(this.createOptions(location));
    }

}

export = Manager;
