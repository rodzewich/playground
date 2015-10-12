/// <reference path="../../../types/chai/chai.d.ts" />
/// <reference path="../../../types/node/node.d.ts" />

import path = require("path");
import assert = require("assert");
import Client = require("../client/Client");
import IClient = require("../client/IClient");
import Daemon = require("../daemon/Daemon");
import IDaemon = require("../client/IDaemon");
import IException = require("../../exception/IException");
import Exception = require("../../exception/Exception");
import deferred = require("../../deferred");
import displayException = require("../../displayException");

require("../../mapping");

process.addListener('uncaughtException', function (error:Error) {
    displayException(Exception.convertFromError(error));
});

var daemon:IDaemon;

function setup(callback:() => void):void {
    var location:string = path.join(__dirname, "location_" + Number(new Date()).toString(16) + ".sock");
    daemon = new Daemon({
        location: location
    });
    daemon.start((errors:IException[]):void => {
        assert.strictEqual(errors, null);
        callback();
    });
}

function shutdown(callback:() => void):void {
    daemon.stop((errors:IException[]):void => {
        assert.strictEqual(errors, null);
        callback();
    });
}

deferred([
    setup,
    (next:() => void):void => {
        var location:string = path.join(__dirname, "location.sock"),
            namespace:string = "something",
            client:IClient = new Client({
                location: location,
                namespace: namespace
            });
        assert.equal(client.location, location);
        assert.equal(client.getLocation(), location);
        assert.equal(client.namespace, namespace);
        assert.equal(client.getNamespace(), namespace);
        next();
    },
    (next:() => void):void => {
        var location:string = path.join(__dirname, "location.sock"),
            namespace:string = "something",
            client:IClient = new Client({
                location: path.join(__dirname, "something.sock")
            });
        client.location = location;
        client.namespace = namespace;
        assert.equal(client.location, location);
        assert.equal(client.getLocation(), location);
        assert.equal(client.namespace, namespace);
        assert.equal(client.getNamespace(), namespace);
        next();
    },
    (next:() => void):void => {
        var location:string = path.join(__dirname, "location.sock"),
            namespace:string = "something",
            client:IClient = new Client({
                location: path.join(__dirname, "something.sock")
            });
        client.setLocation(location);
        client.setNamespace(namespace);
        assert.equal(client.location, location);
        assert.equal(client.getLocation(), location);
        assert.equal(client.namespace, namespace);
        assert.equal(client.getNamespace(), namespace);
        next();
    },
    (next:() => void):void => {
        var location:string = path.join(__dirname, "location.sock"),
            client:IClient = new Client({
                location: location
            });
        client.connect((errors:IException[]):void => {
            assert.equal(errors.length, 1);
            errors.forEach((error:IException):void => {
                assert.equal(error.getMessage(), "socket is not exists");
                assert.equal(error instanceof Exception, true);
            });
            next();
        });
    },
    (next:() => void):void => {
        var location:string = path.join(__dirname, "location.sock"),
            client:IClient = new Client({
                location: location
            });
        assert.equal(client.namespace, "default");
        assert.equal(client.getNamespace(), "default");
        next();
    },
    (next:() => void):void => {
        var client:IClient = new Client({
            location: daemon.location
        });
        client.setItem("test", "test");
        next();
    },
    shutdown
]);

