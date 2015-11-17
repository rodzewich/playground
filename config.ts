/// <reference path="./types/node/node.d.ts" />

import path             = require("path");
import {isNumber, isString, isDefined} from "./lib/utils";
import Separator        = require("./lib/helpers/Separator");
import NamespaceHelper  = require("./lib/helpers/NamespaceHelper");
import INamespaceHelper = require("./lib/helpers/INamespaceHelper");
import displayException = require("./lib/displayException");
import {Exception} from "./lib/exception";
import getobject        = require("getobject");

var config:any,
    cache:any = {};

export const DEBUG:boolean           = false;
export const SERVER_DIRECTORY:string = __dirname;
export const SERVER_BINARY:string    = path.join(SERVER_DIRECTORY, "bin");

export const DEFAULT_PROJECT_SERVER_NAME:string         = "test";
export const DEFAULT_PROJECT_SERVER_VERSION:string      = "0.0.1";
export const DEFAULT_PROJECT_SERVER_HOSTNAME:string     = "localhost";
export const DEFAULT_PROJECT_SERVER_PORT:number         = 80;
export const DEFAULT_PROJECT_SERVER_CHARSET:string      = "utf-8";
export const DEFAULT_PROJECT_LOGS_DIRECTORY:string      = "logs";
export const DEFAULT_PROJECT_TEMPORARY_DIRECTORY:string = "temp";
export const DEFAULT_PROJECT_PUBLIC_DIRECTORY:string    = "public";
export const DEFAULT_PROJECT_MEMORY_SOCKET:string       = "memory.sock";
export const DEFAULT_PROJECT_STATIC_SOCKET:string       = "static.sock";
export const DEFAULT_PROJECT_CSS_SOCKET:string          = "css.sock";
export const DEFAULT_PROJECT_LESS_SOCKET:string         = "less.sock";
export const DEFAULT_PROJECT_SASS_SOCKET:string         = "sass.sock";
export const DEFAULT_PROJECT_STYLUS_SOCKET:string       = "stylus.sock";
export const DEFAULT_PROJECT_ENV:string                 = "/usr/bin/env";
export const DEFAULT_PROJECT_STATIC_USE_INDEX:boolean         = true;
export const DEFAULT_PROJECT_STATIC_INDEX_EXTENSIONS:string[] = ["html", "htm"];
export const DEFAULT_PROJECT_STATIC_USE_GZIP:boolean          = true;
export const DEFAULT_PROJECT_STATIC_GZIP_EXTENSIONS:string[]  = null;
export const DEFAULT_PROJECT_STATIC_GZIP_LEVEL:number         = 1;

export const PROJECT_DIRECTORY:string           = process.cwd();
export const PROJECT_CONFIG:string              = path.join(PROJECT_DIRECTORY, "config.json");
export const PROJECT_SERVER_NAME:string         = getServerName();
export const PROJECT_SERVER_VERSION:string      = getServerVersion();
export const PROJECT_SERVER_HOSTNAME:string     = getServerHostname();
export const PROJECT_SERVER_PORT:number         = getServerPort();
export const PROJECT_SERVER_CHARSET:string      = getServerCharset();
export const PROJECT_PUBLIC_DIRECTORY:string    = getPublicDirectory();
export const PROJECT_LOGS_DIRECTORY:string      = getLogsDirectory();
export const PROJECT_TEMPORARY_DIRECTORY:string = getTemporaryDirectory();
export const PROJECT_MEMORY_SOCKET:string       = getMemorySocket();
export const PROJECT_STATIC_SOCKET:string       = getStaticSocket();
export const PROJECT_CSS_SOCKET:string          = getCssSocket();
export const PROJECT_LESS_SOCKET:string         = getLessSocket();
export const PROJECT_SASS_SOCKET:string         = getSassSocket();
export const PROJECT_STYLUS_SOCKET:string       = getStylusSocket();
export const PROJECT_ENV:string                 = getEnv();
export const PROJECT_STATIC_USE_INDEX:boolean         = getStaticUseIndex();
export const PROJECT_STATIC_INDEX_EXTENSIONS:string[] = getStaticIndexExtensions();
export const PROJECT_STATIC_USE_GZIP:boolean          = getStaticUseGzip();
export const PROJECT_STATIC_GZIP_EXTENSIONS:string[]  = getStaticGzipExtensions();
export const PROJECT_STATIC_GZIP_LEVEL:number         = getStaticGzipLevel();

/*export const DEFAULT_PROJECT_NAMESPACE_SEPARATOR:Separator            = Separator.DOT;
 export const DEFAULT_PROJECT_STATIC_MEMORY_NAMESPACE:string           = new NamespaceHelper(["static"], DEFAULT_PROJECT_NAMESPACE_SEPARATOR).getValue();
 export const DEFAULT_PROJECT_STATIC_METADATA_MEMORY_NAMESPACE:string  = new NamespaceHelper(["metadata"], DEFAULT_PROJECT_NAMESPACE_SEPARATOR).getValue();
 export const DEFAULT_PROJECT_STATIC_BINARY_MEMORY_NAMESPACE:string    = new NamespaceHelper(["binary"], DEFAULT_PROJECT_NAMESPACE_SEPARATOR).getValue();
 export const DEFAULT_PROJECT_STATIC_GZIP_MEMORY_NAMESPACE:string      = new NamespaceHelper(["gzip"], DEFAULT_PROJECT_NAMESPACE_SEPARATOR).getValue();
 export const DEFAULT_PROJECT_STATIC_LOCK_MEMORY_NAMESPACE:string      = new NamespaceHelper(["lock"], DEFAULT_PROJECT_NAMESPACE_SEPARATOR).getValue();*/

/*export const PROJECT_STATIC_MEMORY_NAMESPACE:string           = getStaticMemoryNamespace();
 export const PROJECT_STATIC_METADATA_MEMORY_NAMESPACE:string  = getMetadataMemoryNamespace();
 export const PROJECT_STATIC_BINARY_MEMORY_NAMESPACE:string    = getBinaryMemoryNamespace();
 export const PROJECT_STATIC_GZIP_MEMORY_NAMESPACE:string      = getGzipMemoryNamespace();
 export const PROJECT_STATIC_LOCK_MEMORY_NAMESPACE:string      = getLockMemoryNamespace();*/

/*export const DEFAULT_PROJECT_NAMESPACE_SEPARATOR:Separator    = Separator.DOT;
 export const DEFAULT_STATIC_MEMORY_METADATA:string            = DEFAULT_PROJECT_MEMORY_SOCKET;
 export const DEFAULT_STATIC_MEMORY_BINARY:string              = DEFAULT_PROJECT_MEMORY_SOCKET;
 export const DEFAULT_STATIC_MEMORY_GZIP:string                = DEFAULT_PROJECT_MEMORY_SOCKET;
 export const DEFAULT_STATIC_MEMORY_LOCK:string                = DEFAULT_PROJECT_MEMORY_SOCKET;
 */

function getConfig():any {
    if (!isDefined(config)) {
        try {
            config = <any>require(PROJECT_CONFIG) || null;
        } catch (error) {
            config = null;
        }
    }
    return config;
}

function getStaticUseIndex():boolean {
    // todo: re-implement it
    return DEFAULT_PROJECT_STATIC_USE_INDEX;
}

function getStaticIndexExtensions():string[] {
    // todo: re-implement it
    return DEFAULT_PROJECT_STATIC_INDEX_EXTENSIONS.slice(0);
}

function getStaticUseGzip():boolean {
    // todo: re-implement it
    return DEFAULT_PROJECT_STATIC_USE_GZIP;
}

function getStaticGzipExtensions():string[] {
    // todo: re-implement it
    return DEFAULT_PROJECT_STATIC_GZIP_EXTENSIONS;
}

function getStaticGzipLevel():number {
    // todo: re-implement it
    return DEFAULT_PROJECT_STATIC_GZIP_LEVEL;
}

function getServerName():string {
    var configValue:string;
    if (!isDefined(cache.serverName)) {
        configValue = <string>getobject.get(getConfig(), "server.name");
        if (configValue && isString(configValue)) {
            cache.serverName = configValue;
        } else {
            cache.serverName = DEFAULT_PROJECT_SERVER_NAME;
        }
    }
    return cache.serverName;
}

function getServerVersion():string {
    var configValue:string;
    if (!isDefined(cache.serverVersion)) {
        configValue = <string>getobject.get(getConfig(), "server.version");
        if (configValue && isString(configValue)) {
            cache.serverVersion = configValue;
        } else {
            cache.serverVersion = DEFAULT_PROJECT_SERVER_VERSION;
        }
    }
    return cache.serverVersion;
}

function getServerHostname():string {
    var configValue:string;
    if (!isDefined(cache.hostname)) {
        configValue = <string>getobject.get(getConfig(), "server.hostname");
        if (configValue && isString(configValue)) {
            cache.hostname = configValue;
        } else {
            cache.hostname = DEFAULT_PROJECT_SERVER_HOSTNAME;
        }
    }
    return cache.hostname;
}

function getServerPort():number {
    var configValue:number;
    if (!isDefined(cache.port)) {
        configValue = <number>getobject.get(getConfig(), "server.port");
        if (configValue && isNumber(configValue)) {
            cache.port = configValue;
        } else {
            cache.port = DEFAULT_PROJECT_SERVER_PORT;
        }
    }
    return cache.port;
}

function getServerCharset():string {
    var configValue:string;
    if (!isDefined(cache.serverCharset)) {
        configValue = <string>getobject.get(getConfig(), "server.charset");
        if (configValue && isString(configValue)) {
            cache.serverCharset = configValue;
        } else {
            cache.serverCharset = DEFAULT_PROJECT_SERVER_CHARSET;
        }
    }
    return cache.serverCharset;
}

function getMemorySocket():string {
    var configValue:string,
        temporaryDirectory:string;
    if (!isDefined(cache.memorySocket)) {
        configValue = getobject.get(getConfig(), "temporary.memory");
        temporaryDirectory = getTemporaryDirectory();
        if (configValue && isString(configValue) && !path.isAbsolute(configValue)) {
            cache.memorySocket = path.normalize(path.join(temporaryDirectory, configValue));
        } else if (configValue && isString(configValue) &&
            path.relative(temporaryDirectory, configValue).slice(0, 2) !== "..") {
            cache.memorySocket = path.normalize(configValue);
        } else {
            cache.memorySocket = path.join(temporaryDirectory, DEFAULT_PROJECT_MEMORY_SOCKET);
        }
    }
    return cache.memorySocket;
}

function getStaticSocket():string {
    var configValue:string,
        temporaryDirectory:string;
    if (!isDefined(cache.staticSocket)) {
        configValue = getobject.get(getConfig(), "temporary.static");
        temporaryDirectory = getTemporaryDirectory();
        if (configValue && isString(configValue) && !path.isAbsolute(configValue)) {
            cache.staticSocket = path.normalize(path.join(temporaryDirectory, configValue));
        } else if (configValue && isString(configValue) &&
            path.relative(temporaryDirectory, configValue).slice(0, 2) !== "..") {
            cache.staticSocket = path.normalize(configValue);
        } else {
            cache.staticSocket = path.join(temporaryDirectory, DEFAULT_PROJECT_STATIC_SOCKET);
        }
    }
    return cache.staticSocket;
}

function getCssSocket():string {
    var configValue:string,
        temporaryDirectory:string;
    if (!isDefined(cache.cssSocket)) {
        configValue = getobject.get(getConfig(), "temporary.css");
        temporaryDirectory = getTemporaryDirectory();
        if (configValue && isString(configValue) && !path.isAbsolute(configValue)) {
            cache.cssSocket = path.normalize(path.join(temporaryDirectory, configValue));
        } else if (configValue && isString(configValue) &&
            path.relative(temporaryDirectory, configValue).slice(0, 2) !== "..") {
            cache.cssSocket = path.normalize(configValue);
        } else {
            cache.cssSocket = path.join(temporaryDirectory, DEFAULT_PROJECT_CSS_SOCKET);
        }
    }
    return cache.cssSocket;
}

function getLessSocket():string {
    var configValue:string,
        temporaryDirectory:string;
    if (!isDefined(cache.lessSocket)) {
        configValue = getobject.get(getConfig(), "temporary.less");
        temporaryDirectory = getTemporaryDirectory();
        if (configValue && isString(configValue) && !path.isAbsolute(configValue)) {
            cache.lessSocket = path.normalize(path.join(temporaryDirectory, configValue));
        } else if (configValue && isString(configValue) &&
            path.relative(temporaryDirectory, configValue).slice(0, 2) !== "..") {
            cache.lessSocket = path.normalize(configValue);
        } else {
            cache.lessSocket = path.join(temporaryDirectory, DEFAULT_PROJECT_LESS_SOCKET);
        }
    }
    return cache.lessSocket;
}

function getSassSocket():string {
    var configValue:string,
        temporaryDirectory:string;
    if (!isDefined(cache.sassSocket)) {
        configValue = getobject.get(getConfig(), "temporary.sass");
        temporaryDirectory = getTemporaryDirectory();
        if (configValue && isString(configValue) && !path.isAbsolute(configValue)) {
            cache.sassSocket = path.normalize(path.join(temporaryDirectory, configValue));
        } else if (configValue && isString(configValue) &&
            path.relative(temporaryDirectory, configValue).slice(0, 2) !== "..") {
            cache.sassSocket = path.normalize(configValue);
        } else {
            cache.sassSocket = path.join(temporaryDirectory, DEFAULT_PROJECT_SASS_SOCKET);
        }
    }
    return cache.sassSocket;
}

function getStylusSocket():string {
    var configValue:string,
        temporaryDirectory:string;
    if (!isDefined(cache.sassSocket)) {
        configValue = getobject.get(getConfig(), "temporary.stylus");
        temporaryDirectory = getTemporaryDirectory();
        if (configValue && isString(configValue) && !path.isAbsolute(configValue)) {
            cache.stylusSocket = path.normalize(path.join(temporaryDirectory, configValue));
        } else if (configValue && isString(configValue) &&
            path.relative(temporaryDirectory, configValue).slice(0, 2) !== "..") {
            cache.stylusSocket = path.normalize(configValue);
        } else {
            cache.stylusSocket = path.join(temporaryDirectory, DEFAULT_PROJECT_STYLUS_SOCKET);
        }
    }
    return cache.stylusSocket;
}

function getPublicDirectory():string {
    var configValue:string;
    if (!isDefined(cache.publicDirectory)) {
        configValue = getobject.get(getConfig(), "public.directory");
        if (configValue && isString(configValue) && !path.isAbsolute(configValue)) {
            cache.publicDirectory = path.normalize(path.join(PROJECT_DIRECTORY, configValue));
        } else if (configValue && isString(configValue) &&
            path.relative(PROJECT_DIRECTORY, configValue).slice(0, 2) !== "..") {
            cache.publicDirectory = path.normalize(configValue);
        } else {
            cache.publicDirectory = path.join(PROJECT_DIRECTORY, DEFAULT_PROJECT_PUBLIC_DIRECTORY);
        }
    }
    return cache.publicDirectory;
}

function getLogsDirectory():string {
    var configValue:string;
    if (!isDefined(cache.logsDirectory)) {
        configValue = getobject.get(getConfig(), "logs.directory");
        if (configValue && isString(configValue) && !path.isAbsolute(configValue)) {
            cache.logsDirectory = path.normalize(path.join(PROJECT_DIRECTORY, configValue));
        } else if (configValue && isString(configValue) &&
            path.relative(PROJECT_DIRECTORY, configValue).slice(0, 2) !== "..") {
            cache.logsDirectory = path.normalize(configValue);
        } else {
            cache.logsDirectory = path.join(PROJECT_DIRECTORY, DEFAULT_PROJECT_LOGS_DIRECTORY);
        }
    }
    return cache.logsDirectory;
}

function getTemporaryDirectory():string {
    var configValue:string;
    if (!isDefined(cache.temporaryDirectory)) {
        configValue = getobject.get(getConfig(), "temporary.directory");
        if (configValue && isString(configValue) && !path.isAbsolute(configValue)) {
            cache.temporaryDirectory = path.normalize(path.join(PROJECT_DIRECTORY, configValue));
        } else if (configValue && isString(configValue) &&
            path.relative(PROJECT_DIRECTORY, configValue).slice(0, 2) !== "..") {
            cache.temporaryDirectory = path.normalize(configValue);
        } else {
            cache.temporaryDirectory = path.join(PROJECT_DIRECTORY, DEFAULT_PROJECT_TEMPORARY_DIRECTORY);
        }
    }
    return cache.temporaryDirectory;
}

function getEnv():string {
    var env:string;
    if (!isDefined(cache.env)) {
        env = getobject.get(getConfig(), "env");
        if (isString(env)) {
            cache.env = String(env);
        } else {
            cache.env = DEFAULT_PROJECT_ENV;
        }
    }
    return cache.env;
}
