import IManager = require("./IManager");
import IOptions = require("./IOptions");
import BaseManager = require("../../css/manager/Manager");
import IClient = require("../client/IClient");
import Client = require("../client/Client");
import typeOf = require("../../typeOf");

class Manager extends BaseManager {

    constructor(options:IOptions) {
        super(options);
    }

    protected createClient(location:string):IClient {
        return new Client(this.createOptions(location));
    }

}

export = Manager;
