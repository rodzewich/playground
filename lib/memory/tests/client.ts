/// <reference path="../../../types/node/node.d.ts" />

import fs         = require("fs");
import path       = require("path");
import assert     = require("assert");
import {IClient, Client} from "../client";
import {IDaemon, Daemon} from "../daemon";
import {IException, Exception} from "../../exception";
import {typeOf, deferred, parallel} from "../../utils";

// todo: проверять обращение к другим namespace
// todo: проверять содержание локов в том же объекте
// todo: проверять очередь connect/disconnect
// todo: проверять свойства connected/connecting
// todo: проверять свойства disconnected/disconnecting
// todo: проверять методы isConnected/isConnecting
// todo: проверять методы isDisconnected/isDisconnecting
// todo: проверять timeout/getTimeout
// todo: проверять debug/isDebug
// todo: пробовать удалять/читать не существующие элементы

function run(debug:boolean, callback:() => void):void {
    var daemon:IDaemon,
        location:string = path.join(__dirname, "client.sock");

    function setup(callback:() => void):void {
        daemon = new Daemon({
            location: location
        });
        deferred([
            (next:() => void):void => {
                fs.unlink(location, next);
            },
            (next:() => void):void => {
                daemon.start((errors:IException[]):void => {
                    assert.strictEqual(errors, null);
                    next();
                });
            },
            (next:() => void):void => {
                fs.stat(location, (error:NodeJS.ErrnoException, stats:net.Stats):void => {
                    assert.strictEqual(error, null);
                    assert.strictEqual(stats.isSocket(), true);
                    next();
                });
            },
            ():void => {
                callback();
            }
        ]);
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
                fs.stat(location, (error: NodeJS.ErrnoException):void => {
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
                    location  : location,
                    namespace : namespace,
                    debug     : debug
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
                    location : path.join(__dirname, "something.sock"),
                    debug    : debug
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
                    location : path.join(__dirname, "something.sock"),
                    debug    : debug
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
                    location : location,
                    debug    : debug
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
                    location : location,
                    debug    : debug
                });
            assert.strictEqual(client.namespace, "default");
            assert.strictEqual(client.getNamespace(), "default");
            next();
        },
        // ping
        (next:() => void):void => {
            var client:IClient = new Client({
                location : location,
                debug    : debug
            });
            deferred([
                (next:() => void):void => {
                    client.ping((errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    var disconnected:boolean = false;
                    parallel([
                        (done:() => void):void => {
                            client.disconnect((errors):void => {
                                assert.strictEqual(errors, null);
                                disconnected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(disconnected, true);
                                done();
                            }, 1000).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                ():void => {
                    next();
                }
            ]);
        },
        // set/get items
        (next:() => void):void => {
            var client:IClient = new Client({
                location : location,
                debug    : debug
            });
            deferred([
                (next:() => void):void => {
                    client.setItem("key1", "test1", null, (errors):void => {
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
                    client.setItem(null, "test1", null, (errors):void => {
                        assert.notStrictEqual(errors, null);
                        assert.strictEqual(errors[0].message, "key should be a string");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getItem(null, (errors):void => {
                        assert.notStrictEqual(errors, null);
                        assert.strictEqual(errors[0].message, "key should be a string");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.setItems({
                        key2: "test2",
                        key3: "test3"
                    }, null, (errors):void => {
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
                (next:() => void):void => {
                    client.setItems(null, null, (errors):void => {
                        assert.notStrictEqual(errors, null);
                        assert.strictEqual(errors[0].message, "data should be a non empty object");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getItems(null, (errors):void => {
                        assert.notStrictEqual(errors, null);
                        assert.strictEqual(errors[0].message, "keys should be a non empty strings array");
                        next();
                    });
                },
                (next:() => void):void => {
                    var disconnected:boolean = false;
                    parallel([
                        (done:() => void):void => {
                            client.disconnect((errors):void => {
                                assert.strictEqual(errors, null);
                                disconnected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(disconnected, true);
                                done();
                            }, 1000).ref();
                        }
                    ], ():void => {
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
            var client:IClient = new Client({
                location : location,
                debug    : debug
            });
            deferred([
                (next:() => void):void => {
                    client.hasItem("key1", (errors, result:boolean):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(result, true);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.hasItem("key4", (errors, result:boolean):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(result, false);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.hasItems(["key1", "key2", "key3", "key4"], (errors, result:{[index:string]:boolean}|any):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(result.key1, true);
                        assert.strictEqual(result.key2, true);
                        assert.strictEqual(result.key3, true);
                        assert.strictEqual(result.key4, false);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.removeItem("key1", (errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.removeItems(["key2", "key3"], (errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.hasItems(["key1", "key2", "key3", "key4"], (errors, result:{[index:string]:boolean}|any):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(result.key1, false);
                        assert.strictEqual(result.key2, false);
                        assert.strictEqual(result.key3, false);
                        assert.strictEqual(result.key4, false);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.hasItem(null, (errors):void => {
                        assert.strictEqual(errors[0].getMessage(), "key should be a string");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.hasItems(null, (errors):void => {
                        assert.strictEqual(errors[0].getMessage(), "keys should be a non empty strings array");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.removeItem(null, (errors):void => {
                        assert.strictEqual(errors[0].getMessage(), "key should be a string");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.removeItems(null, (errors):void => {
                        assert.strictEqual(errors[0].getMessage(), "keys should be a non empty strings array");
                        next();
                    });
                },
                (next:() => void):void => {
                    var disconnected:boolean = false;
                    parallel([
                        (done:() => void):void => {
                            client.disconnect((errors):void => {
                                assert.strictEqual(errors, null);
                                disconnected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(disconnected, true);
                                done();
                            }, 1000).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                ():void => {
                    next();
                }
            ]);
        },
        // length
        (next:() => void):void => {
            var client:IClient = new Client({
                location : location,
                debug    : debug
            });
            deferred([
                (next:() => void):void => {
                    client.getLength((errors, result:number):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(result, 0);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.setItems({
                        key2: "test2",
                        key3: "test3"
                    }, null, (errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getLength((errors, result:number):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(result, 2);
                        next();
                    });
                },
                (next:() => void):void => {
                    var disconnected:boolean = false;
                    parallel([
                        (done:() => void):void => {
                            client.disconnect((errors):void => {
                                assert.strictEqual(errors, null);
                                disconnected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(disconnected, true);
                                done();
                            }, 1000).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                ():void => {
                    next();
                }
            ]);
        },
        // keys
        (next:() => void):void => {
            var client:IClient = new Client({
                location : location,
                debug    : debug
            });
            deferred([
                (next:() => void):void => {
                    client.getKey(0, (errors, response:string) => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(response, "key2");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getKey(null, (errors) => {
                        assert.notStrictEqual(errors, null);
                        assert.strictEqual(errors[0].getMessage(), "index should be a positive number");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getKeys([0, 1], (errors, response:string[]) => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(response.length, 2);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getKeys(null, (errors) => {
                        assert.notStrictEqual(errors, null);
                        assert.strictEqual(errors[0].getMessage(), "indexes should be a positive numbers array");
                        next();
                    });
                },
                (next:() => void):void => {
                    var disconnected:boolean = false;
                    parallel([
                        (done:() => void):void => {
                            client.disconnect((errors):void => {
                                assert.strictEqual(errors, null);
                                disconnected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(disconnected, true);
                                done();
                            }, 1000).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                ():void => {
                    next();
                }
            ]);
        },
        // namespaces
        (next:() => void):void => {
            var client:IClient = new Client({
                location  : location,
                namespace : "custom",
                debug     : debug
            });
            deferred([
                (next:() => void):void => {
                    client.getNamespaces((errors, response):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(response.length, 1);
                        assert.notStrictEqual(response.indexOf("default"), -1);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.setItem("key1", "test1", null, (errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getNamespaces((errors, response):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(response.length, 2);
                        assert.notStrictEqual(response.indexOf("default"), -1);
                        assert.notStrictEqual(response.indexOf("custom"), -1);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.hasNamespace("custom", (errors, response):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(response, true);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.hasNamespace("another", (errors, response):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(response, false);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.removeNamespace("custom", (errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.hasNamespace("custom", (errors, response):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(response, false);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getItem("key1", (errors, response:any):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(response, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    var disconnected:boolean = false;
                    parallel([
                        (done:() => void):void => {
                            client.disconnect((errors):void => {
                                assert.strictEqual(errors, null);
                                disconnected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(disconnected, true);
                                done();
                            }, 1000).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                ():void => {
                    next();
                }
            ]);
        },
        // locks
        (next:() => void):void => {
            var current:string,
                client:IClient = new Client({
                    location : location,
                    debug    : debug
                });
            parallel([
                (done:() => void):void => {
                    client.lock("key", (errors, unlock:(callback?:(errors:IException[]) => void) => void):void => {
                        current = "lock1";
                        assert.strictEqual(errors, null);
                        client.getItem("inc", (errors, value):void => {
                            assert.strictEqual(errors, null);
                            assert.strictEqual(current, "lock1");
                            client.setItem("inc", (value || 0) + 1, null, (errors):void => {
                                assert.strictEqual(errors, null);
                                assert.strictEqual(current, "lock1");
                                unlock((errors):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(current, "lock1");
                                    done();
                                });
                            });
                        });
                    });
                },
                (done:() => void):void => {
                    client.lock("key", (errors, unlock:(callback?:(errors:IException[]) => void) => void):void => {
                        current = "lock2";
                        assert.strictEqual(errors, null);
                        client.getItem("inc", (errors, value):void => {
                            assert.strictEqual(errors, null);
                            assert.strictEqual(current, "lock2");
                            client.setItem("inc", (value || 0) + 1, null, (errors):void => {
                                assert.strictEqual(errors, null);
                                assert.strictEqual(current, "lock2");
                                unlock((errors):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(current, "lock2");
                                    done();
                                });
                            });
                        });
                    });
                },
                (done:() => void):void => {
                    client.lock("key", (errors, unlock:(callback?:(errors:IException[]) => void) => void):void => {
                        current = "lock3";
                        assert.strictEqual(errors, null);
                        client.getItem("inc", (errors, value):void => {
                            assert.strictEqual(errors, null);
                            assert.strictEqual(current, "lock3");
                            client.setItem("inc", (value || 0) + 1, null, (errors):void => {
                                assert.strictEqual(errors, null);
                                assert.strictEqual(current, "lock3");
                                unlock((errors):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(current, "lock3");
                                    done();
                                });
                            });
                        });
                    });
                },
            ], ():void => {
                deferred([
                    (next:() => void):void => {
                        client.getItem("inc", (errors, value):void => {
                            assert.strictEqual(errors, null);
                            assert.strictEqual(value, 3);
                            next();
                        });
                    },
                    (next:() => void):void => {
                        var disconnected:boolean = false;
                        parallel([
                            (done:() => void):void => {
                                client.disconnect((errors):void => {
                                    assert.strictEqual(errors, null);
                                    disconnected = true;
                                    done();
                                });
                            },
                            (done:() => void):void => {
                                setTimeout(():void => {
                                    assert.strictEqual(disconnected, true);
                                    done();
                                }, 1000).ref();
                            }
                        ], ():void => {
                            next();
                        });
                    },
                    ():void => {
                        next();
                    }
                ]);
            });
        },
        // ttls
        (next:() => void):void => {
            var client:IClient = new Client({
                location : location,
                debug    : debug
            });
            deferred([
                (next:() => void):void => {
                    client.removeNamespace("default", (errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.setItem("key1", "test1", 1000, (errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    parallel([
                        (done:() => void):void => {
                            setTimeout(():void => {
                                client.hasItem("key1", (errors, response:boolean):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(response, true);
                                    done();
                                });
                            }, 500).ref();
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                client.hasItem("key1", (errors, response:boolean):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(response, false);
                                    done();
                                });
                            }, 1000).ref();
                        },
                    ], ():void => {
                        next();
                    });
                },
                (next:() => void):void => {
                    client.setItems({
                        key2 : "test2",
                        key3 : "test3"
                    }, 1000, (errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    parallel([
                        (done:() => void):void => {
                            setTimeout(():void => {
                                client.hasItem("key2", (errors, response:boolean):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(response, true);
                                    done();
                                });
                            }, 500).ref();
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                client.hasItem("key3", (errors, response:boolean):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(response, true);
                                    done();
                                });
                            }, 500).ref();
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                client.hasItem("key2", (errors, response:boolean):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(response, false);
                                    done();
                                });
                            }, 1000).ref();
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                client.hasItem("key3", (errors, response:boolean):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(response, false);
                                    done();
                                });
                            }, 1000).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                (next:() => void):void => {
                    client.setBin("key1", "test1", 1000, (errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    parallel([
                        (done:() => void):void => {
                            setTimeout(():void => {
                                client.hasItem("key1", (errors, response:boolean):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(response, true);
                                    done();
                                });
                            }, 500).ref();
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                client.hasItem("key1", (errors, response:boolean):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(response, false);
                                    done();
                                });
                            }, 1000).ref();
                        },
                    ], ():void => {
                        next();
                    });
                },
                (next:() => void):void => {
                    client.setBins({
                        key2 : "test2",
                        key3 : "test3"
                    }, 1000, (errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    parallel([
                        (done:() => void):void => {
                            setTimeout(():void => {
                                client.hasItem("key2", (errors, response:boolean):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(response, true);
                                    done();
                                });
                            }, 500).ref();
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                client.hasItem("key3", (errors, response:boolean):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(response, true);
                                    done();
                                });
                            }, 500).ref();
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                client.hasItem("key2", (errors, response:boolean):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(response, false);
                                    done();
                                });
                            }, 1000).ref();
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                client.hasItem("key3", (errors, response:boolean):void => {
                                    assert.strictEqual(errors, null);
                                    assert.strictEqual(response, false);
                                    done();
                                });
                            }, 1000).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                (next:() => void):void => {
                    var disconnected:boolean = false;
                    parallel([
                        (done:() => void):void => {
                            client.disconnect((errors):void => {
                                assert.strictEqual(errors, null);
                                disconnected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(disconnected, true);
                                done();
                            }, 1000).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                ():void => {
                    next();
                }
            ]);
        },
        // info
        (next:() => void):void => {
            var client:IClient = new Client({
                location : location,
                debug    : debug
            });
            deferred([
                (next:() => void):void => {
                    client.getInfo((errors, info):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(info.pid, process.pid);
                        assert.strictEqual(info.gid, process.getgid());
                        assert.strictEqual(info.uid, process.getuid());
                        assert.strictEqual(info.cwd, process.cwd());
                        assert.strictEqual(info.arch, process.arch);
                        assert.strictEqual(typeOf(info.uptime), "number");
                        assert.strictEqual(info.platform, process.platform);
                        assert.strictEqual(info.version, process.version);
                        assert.strictEqual(info.execPath, process.execPath);
                        assert.strictEqual(typeOf(info.execArgv), "array");
                        assert.strictEqual(typeOf(info.memoryUsage), "object");
                        assert.strictEqual(typeOf(info.memoryUsage.rss), "number");
                        assert.strictEqual(typeOf(info.memoryUsage.heapTotal), "number");
                        assert.strictEqual(typeOf(info.memoryUsage.heapUsed), "number");
                        next();
                    });
                },
                (next:() => void):void => {
                    var disconnected:boolean = false;
                    parallel([
                        (done:() => void):void => {
                            client.disconnect((errors):void => {
                                assert.strictEqual(errors, null);
                                disconnected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(disconnected, true);
                                done();
                            }, 1000).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                ():void => {
                    next();
                }
            ]);
        },
        // increment/decrement
        (next:() => void):void => {
            var client:IClient = new Client({
                location : location,
                debug    : debug
            });
            deferred([
                (next:() => void):void => {
                    client.increment("inc", null, (errors, value):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(value, "1");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.increment("inc", null, (errors, value):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(value, "2");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.increment("inc", null, (errors, value):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(value, "3");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getItem("inc", (errors, value):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(value, "3");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.decrement("dec", null, (errors, value):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(value, "-1");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.decrement("dec", null, (errors, value):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(value, "-2");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.decrement("dec", null, (errors, value):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(value, "-3");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getItem("dec", (errors, value):void => {
                        assert.strictEqual(errors, null);
                        assert.strictEqual(value, "-3");
                        next();
                    });
                },
                (next:() => void):void => {
                    var disconnected:boolean = false;
                    parallel([
                        (done:() => void):void => {
                            client.disconnect((errors):void => {
                                assert.strictEqual(errors, null);
                                disconnected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(disconnected, true);
                                done();
                            }, 1000).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                ():void => {
                    next();
                }
            ]);
        },
        // bin data
        (next:() => void):void => {
            var test1:Buffer = new Buffer([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
                test2:Buffer = new Buffer([11, 12, 13, 14, 15, 16, 17, 18, 19, 20]),
                test3:Buffer = new Buffer([21, 22, 23, 24, 25, 26, 27, 28, 29, 30]),
                client:IClient = new Client({
                    location : location,
                    debug    : debug
                });
            deferred([
                (next:() => void):void => {
                    client.setBin("key1", test1, null, (errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getBin("key1", (errors, value:Buffer):void => {
                        assert.strictEqual(errors, null);
                        assert.notStrictEqual(value, null);
                        assert.strictEqual(value.equals(test1), true);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.setBin(null, test1, null, (errors):void => {
                        assert.notStrictEqual(errors, null);
                        assert.strictEqual(errors[0].message, "key should be a string");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getBin(null, (errors):void => {
                        assert.notStrictEqual(errors, null);
                        assert.strictEqual(errors[0].message, "key should be a string");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.setBins({
                        key2: test2,
                        key3: test3
                    }, null, (errors):void => {
                        assert.strictEqual(errors, null);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getBins(["key1", "key2", "key3"], (errors, result):void => {
                        assert.strictEqual(errors, null);
                        assert.notStrictEqual(result, null);
                        assert.notStrictEqual(result.key1, null);
                        assert.notStrictEqual(result.key2, null);
                        assert.notStrictEqual(result.key3, null);
                        assert.strictEqual(result.key1.equals(test1), true);
                        assert.strictEqual(result.key2.equals(test2), true);
                        assert.strictEqual(result.key3.equals(test3), true);
                        next();
                    });
                },
                (next:() => void):void => {
                    client.setBins(null, null, (errors):void => {
                        assert.notStrictEqual(errors, null);
                        assert.strictEqual(errors[0].message, "data should be a non empty object");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getBins(null, (errors):void => {
                        assert.notStrictEqual(errors, null);
                        assert.strictEqual(errors[0].message, "keys should be a non empty strings array");
                        next();
                    });
                },
                (next:() => void):void => {
                    client.getItems(["key1", "key2", "key3"], (errors, result):void => {
                        assert.strictEqual(errors, null);
                        assert.notStrictEqual(result, null);
                        assert.strictEqual(result.key1, "AQIDBAUGBwgJCg==");
                        assert.strictEqual(result.key2, "CwwNDg8QERITFA==");
                        assert.strictEqual(result.key3, "FRYXGBkaGxwdHg==");
                        next();
                    });
                },
                (next:() => void):void => {
                    var disconnected:boolean = false;
                    parallel([
                        (done:() => void):void => {
                            client.disconnect((errors):void => {
                                assert.strictEqual(errors, null);
                                disconnected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(disconnected, true);
                                done();
                            }, 1000).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                ():void => {
                    next();
                }
            ]);
        },
        // connection
        (next:() => void):void => {
            var client:IClient  = new Client({
                location : location,
                debug    : debug
            });
            deferred([
                (next:() => void):void => {
                    var connected = false;
                    parallel([
                        (done:() => void):void => {
                            client.connect((errors):void => {
                                assert.strictEqual(errors, null);
                                connected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(connected, true);
                                done();
                            }, 500).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                (next:() => void):void => {
                    var disconnected = false;
                    parallel([
                        (done:() => void):void => {
                            client.disconnect((errors):void => {
                                assert.strictEqual(errors, null);
                                disconnected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(disconnected, true);
                                done();
                            }, 500).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                (next:() => void):void => {
                    var connected = false;
                    parallel([
                        (done:() => void):void => {
                            client.connect((errors):void => {
                                assert.strictEqual(errors, null);
                                connected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(connected, true);
                                done();
                            }, 500).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                (next:() => void):void => {
                    var disconnected = false;
                    parallel([
                        (done:() => void):void => {
                            client.disconnect((errors):void => {
                                assert.strictEqual(errors, null);
                                disconnected = true;
                                done();
                            });
                        },
                        (done:() => void):void => {
                            setTimeout(():void => {
                                assert.strictEqual(disconnected, true);
                                done();
                            }, 500).ref();
                        }
                    ], ():void => {
                        next();
                    });
                },
                ():void => {
                    next();
                }
            ]);
        },
        // stop
        (next:() => void):void => {
            var stopped:boolean = false,
                client:IClient  = new Client({
                    location : location,
                    debug    : debug
                });
            parallel([
                (done:() => void):void => {
                    client.stop((errors):void => {
                        assert.strictEqual(errors, null);
                        stopped = true;
                        done();
                    });
                },
                (done:() => void):void => {
                    setTimeout(():void => {
                        assert.strictEqual(stopped, true);
                        done();
                    }, 500).ref();
                }
            ], ():void => {
                next();
            });
        },
        shutdown,
        callback
    ]);

}

export = run;