/// <reference path="./IClient.ts" />
/// <reference path="./IOptions.ts" />
/// <reference path="../../client/Client.ts" />

import IClient = require("./IClient");
import IOptions = require("./IOptions");
import AbstractClient = require("../../client/Client");

class Client extends AbstractClient implements IClient {
    constructor(options:IOptions) {
        super(options);
    }
}

export = Client;
