/// <reference path="../../../types/chai/chai.d.ts" />
/// <reference path="../../../types/node/node.d.ts" />

import path = require("path");
import assert = require("assert");
import Client = require("../client/Client");
import IClient = require("../client/IClient");
import IException = require("../../exception/IException");
import Exception = require("../../exception/Exception");
import typeOf = require("../../typeOf");
import displayException = require("../../displayException");

require("../../mapping");

var location1:string = path.join(__dirname, "location1.sock");
var namespace1:string = "something1";
var location2:string = path.join(__dirname, "location2.sock");
var namespace2:string = "something2";
var location3:string = path.join(__dirname, "location3.sock");
var namespace3:string = "something3";
var client:IClient = new Client({
    location: location1,
    namespace: namespace1
});

process.addListener('uncaughtException', function (error:Error) {
    displayException(Exception.convertFromError(error));
});

assert.equal(client.location, location1);
assert.equal(client.getLocation(), location1);
assert.equal(client.namespace, namespace1);
assert.equal(client.getNamespace(), namespace1);

client.location = location2;
client.namespace = namespace2;

assert.equal(client.location, location2);
assert.equal(client.getLocation(), location2);
assert.equal(client.namespace, namespace2);
assert.equal(client.getNamespace(), namespace2);

client.setLocation(location3);
client.setNamespace(namespace3);

assert.equal(client.location, location3);
assert.equal(client.getLocation(), location3);
assert.equal(client.namespace, namespace3);
assert.equal(client.getNamespace(), namespace3);

client.connect((errors:IException[]):void => {
    assert.equal(errors.length, 1);
    errors.forEach((error:IException):void => {
        assert.equal(error.getMessage(), "connection not exists");
        assert.equal(error instanceof Exception, true);
    });
});

