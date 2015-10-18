

import Client = require("../client/Client");
import IClient = require("../client/IClient");

var client:IClient = new Client();

client.getContent("/path/filename.png", (errors:Exception[], content:Buffer):void => {

});

client.stop((errors:Exception[]):void => {

});
