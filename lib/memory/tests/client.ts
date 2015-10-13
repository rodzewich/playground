/// <reference path="../../../types/chai/chai.d.ts" />
/// <reference path="../../../types/node/node.d.ts" />

import fs = require("fs");
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
    deferred([
        (next:() => void):void => {
            daemon.stop((errors:IException[]):void => {
                assert.strictEqual(errors, null);
                next();
            });
        },
        (next:() => void):void => {
            fs.stat(daemon.location, (error: NodeJS.ErrnoException):void => {
                assert.strictEqual(error.code, "ENOENT");
                next();
            });
        },
        ():void => {
            callback();
        }
    ]);
}

deferred([
    setup,
    // set options via constructor
    (next:() => void):void => {
        var location:string = path.join(__dirname, "location.sock"),
            namespace:string = "something",
            client:IClient = new Client({
                location: location,
                namespace: namespace
            });
        assert.strictEqual(client.location, location);
        assert.strictEqual(client.getLocation(), location);
        assert.strictEqual(client.namespace, namespace);
        assert.strictEqual(client.getNamespace(), namespace);
        next();
    },
    // set options via setters
    (next:() => void):void => {
        var location:string = path.join(__dirname, "location.sock"),
            namespace:string = "something",
            client:IClient = new Client({
                location: path.join(__dirname, "something.sock")
            });
        client.location = location;
        client.namespace = namespace;
        assert.strictEqual(client.location, location);
        assert.strictEqual(client.getLocation(), location);
        assert.strictEqual(client.namespace, namespace);
        assert.strictEqual(client.getNamespace(), namespace);
        next();
    },
    // set options via methods
    (next:() => void):void => {
        var location:string = path.join(__dirname, "location.sock"),
            namespace:string = "something",
            client:IClient = new Client({
                location: path.join(__dirname, "something.sock")
            });
        client.setLocation(location);
        client.setNamespace(namespace);
        assert.strictEqual(client.location, location);
        assert.strictEqual(client.getLocation(), location);
        assert.strictEqual(client.namespace, namespace);
        assert.strictEqual(client.getNamespace(), namespace);
        next();
    },
    // try connect
    (next:() => void):void => {
        var location:string = path.join(__dirname, "location.sock"),
            client:IClient = new Client({
                location: location
            });
        client.connect((errors:IException[]):void => {
            assert.strictEqual(errors.length, 1);
            errors.forEach((error:IException):void => {
                assert.strictEqual(error.getMessage(), "socket is not exists");
                assert.strictEqual(error instanceof Exception, true);
            });
            next();
        });
    },
    // default namespace
    (next:() => void):void => {
        var location:string = path.join(__dirname, "location.sock"),
            client:IClient = new Client({
                location: location
            });
        assert.strictEqual(client.namespace, "default");
        assert.strictEqual(client.getNamespace(), "default");
        next();
    },
    // ping
    /*(next:() => void):void => {
        var client:IClient = new Client({
            location: daemon.location
        });
        client.ping((errors):void => {
            console.log(errors);
            assert.strictEqual(errors, null);
            next();
        });
        client.increment("key", (errors):void => {
            console.log(errors);
            assert.strictEqual(errors, null);
            next();
        });
    },*/
    // set/get items
    (next:() => void):void => {
        var client:IClient = new Client({
            location: daemon.location
        });
        deferred([
            (next:() => void):void => {
                client.setItem("key1", "test1", (errors):void => {
                    assert.strictEqual(errors, null);
                    next();
                });
            },
            (next:() => void):void => {
                client.getItem("key1", (errors, value):void => {
                    assert.strictEqual(errors, null);
                    assert.strictEqual(value, "test1");
                    next();
                });
            },
            (next:() => void):void => {
                client.setItems({
                    key2: "test2",
                    key3: "test3"
                }, (errors):void => {
                    assert.strictEqual(errors, null);
                    next();
                });
            },
            (next:() => void):void => {
                client.getItems(["key1", "key2", "key3"], (errors, result):void => {
                    assert.strictEqual(errors, null);
                    assert.strictEqual(result.key1, "test1");
                    assert.strictEqual(result.key2, "test2");
                    assert.strictEqual(result.key3, "test3");
                    next();
                });
            },
            ():void => {
                next();
            }
        ]);
    },
    // has/remove items
    (next:() => void):void => {

    },
    shutdown
]);

