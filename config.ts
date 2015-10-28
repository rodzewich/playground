/// <reference path="./types/node/node.d.ts" />

import path             = require("path");
import IConfig          = require("./lib/IConfig");
import isString         = require("./lib/isString");
import isDefined        = require("./lib/isDefined");
import Separator        = require("./lib/helpers/Separator");
import NamespaceHelper  = require("./lib/helpers/NamespaceHelper");
import INamespaceHelper = require("./lib/helpers/INamespaceHelper");
import getobject        = require('getobject');

module config {
    var config:IConfig;
    var cache:IConfig = <IConfig>{};

    export const DEBUG:boolean = true;
    export const SYSTEM_DIRECTORY:string = __dirname;
    export const BINARY_DIRECTORY:string = path.join(SYSTEM_DIRECTORY, "bin");
    export const SYSTEM_ENVIRONMENT:string = "/usr/bin/env";

    export const PROJECT_DIRECTORY:string = process.cwd();
    export const PROJECT_CONFIG:string    = path.join(PROJECT_DIRECTORY, "config.json");

    export const DEFAULT_PROJECT_LOGS_DIRECTORY:string            = path.join(PROJECT_DIRECTORY, "logs");
    export const DEFAULT_PROJECT_TEMPORARY_DIRECTORY:string       = path.join(PROJECT_DIRECTORY, "temp");
    export const DEFAULT_PROJECT_MEMORY_SOCKET:string             = path.join(DEFAULT_PROJECT_TEMPORARY_DIRECTORY, "memory.sock");
    export const DEFAULT_PROJECT_STATIC_SOCKET:string             = path.join(DEFAULT_PROJECT_TEMPORARY_DIRECTORY, "static.sock");

    export const DEFAULT_PROJECT_NAMESPACE_SEPARATOR:Separator    = Separator.DOT;
    export const DEFAULT_PROJECT_PUBLIC_DIRECTORY:string          = path.join(PROJECT_DIRECTORY, "public");
    export const DEFAULT_PROJECT_CSS_SOCKET:string                = path.join(DEFAULT_PROJECT_TEMPORARY_DIRECTORY, "css.sock");
    export const DEFAULT_PROJECT_LESS_SOCKET:string               = path.join(DEFAULT_PROJECT_TEMPORARY_DIRECTORY, "less.sock");
    export const DEFAULT_PROJECT_SASS_SOCKET:string               = path.join(DEFAULT_PROJECT_TEMPORARY_DIRECTORY, "sass.sock");
    export const DEFAULT_PROJECT_STYLUS_SOCKET:string             = path.join(DEFAULT_PROJECT_TEMPORARY_DIRECTORY, "stylus.sock");
    export const DEFAULT_STATIC_MEMORY_METADATA:string            = DEFAULT_PROJECT_MEMORY_SOCKET;
    export const DEFAULT_STATIC_MEMORY_BINARY:string              = DEFAULT_PROJECT_MEMORY_SOCKET;
    export const DEFAULT_STATIC_MEMORY_GZIP:string                = DEFAULT_PROJECT_MEMORY_SOCKET;
    export const DEFAULT_STATIC_MEMORY_LOCK:string                = DEFAULT_PROJECT_MEMORY_SOCKET;
    export const DEFAULT_STATIC_MEMORY_NAMESPACE:INamespaceHelper = new NamespaceHelper(["static"], DEFAULT_PROJECT_NAMESPACE_SEPARATOR);
    export const DEFAULT_STATIC_METADATA_MEMORY_NAMESPACE:string  = NamespaceHelper.parse(DEFAULT_STATIC_MEMORY_NAMESPACE.getValue(), DEFAULT_PROJECT_NAMESPACE_SEPARATOR).addToNamespace(["metadata"]);
    export const DEFAULT_STATIC_BINARY_MEMORY_NAMESPACE:string    = NamespaceHelper.parse(DEFAULT_STATIC_MEMORY_NAMESPACE.getValue(), DEFAULT_PROJECT_NAMESPACE_SEPARATOR).addToNamespace(["binary"]);
    export const DEFAULT_STATIC_GZIP_MEMORY_NAMESPACE:string      = NamespaceHelper.parse(DEFAULT_STATIC_MEMORY_NAMESPACE.getValue(), DEFAULT_PROJECT_NAMESPACE_SEPARATOR).addToNamespace(["gzip"]);
    export const DEFAULT_STATIC_LOCK_MEMORY_NAMESPACE:string      = NamespaceHelper.parse(DEFAULT_STATIC_MEMORY_NAMESPACE.getValue(), DEFAULT_PROJECT_NAMESPACE_SEPARATOR).addToNamespace(["lock"]);

    export function getConfig():any {
        if (!isDefined(config)) {
            try {
                config = <IConfig>require(PROJECT_CONFIG);
            } catch (error:Error) {
                config = null;
            }
        }
        return config;
    }

    export function getEnvironment():string {
        var environment:string;
        if (!isDefined(cache.ENVIRONMENT)) {
            environment = getobject.get(getConfig(), "ENVIRONMENT");
            cache.ENVIRONMENT = SYSTEM_ENVIRONMENT;
            if (isDefined(environment)) {
                cache.ENVIRONMENT = String(environment);
            }
        }
        return cache.ENVIRONMENT;
    }

    export function getMemorySocket():string {
        var socket:string = DEFAULT_PROJECT_MEMORY_SOCKET,
            temp:string = getobject.get(getConfig(), "MEMORY_SOCKET");
        if (isDefined(temp)) {
            socket = temp;
        }
        if (!path.isAbsolute(socket)) {
            socket = path.join(PROJECT_DIRECTORY, socket);
        }
        return path.resolve(socket);
    }

    export function getStaticSocket():string {
        var socket:string = DEFAULT_PROJECT_STATIC_SOCKET,
            temp:string = getobject.get(getConfig(), "STATIC_SOCKET");
        if (isDefined(temp)) {
            socket = temp;
        }
        if (!path.isAbsolute(socket)) {
            socket = path.join(PROJECT_DIRECTORY, socket);
        }
        return path.resolve(socket);
    }

    export function getLogsDirectory():string {
        var directory:string = DEFAULT_PROJECT_LOGS_DIRECTORY,
            temp:string = getobject.get(getConfig(), "LOGS_DIRECTORY");
        if (isDefined(temp)) {
            directory = temp;
        }
        if (!path.isAbsolute(directory)) {
            directory = path.join(PROJECT_DIRECTORY, directory);
        }
        return path.resolve(directory);
    }

    export function getTemporaryDirectory():string {
        var directory:string = DEFAULT_PROJECT_TEMPORARY_DIRECTORY,
            temp:string = getobject.get(getConfig(), "TEMPORARY_DIRECTORY");
        if (isDefined(temp)) {
            directory = temp;
        }
        if (!path.isAbsolute(directory)) {
            directory = path.join(PROJECT_DIRECTORY, directory);
        }
        return path.resolve(directory);
    }

    export function getPublicDirectory():string {
        var config:any = getConfig(),
            directory:string = DEFAULT_PROJECT_PUBLIC_DIRECTORY;
        if (config && isString(config.PUBLIC_DIRECTORY)) {
            directory = config.PUBLIC_DIRECTORY;
        }
        if (!path.isAbsolute(directory)) {
            directory = path.join(PROJECT_DIRECTORY, directory);
        }
        return path.resolve(directory);
    }

}

export = config;
