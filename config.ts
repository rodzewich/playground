/// <reference path="./types/node/node.d.ts" />

import path             = require("path");
import isString         = require("./lib/isString");
import isDefined        = require("./lib/isDefined");
import Separator        = require("./lib/helpers/Separator");
import NamespaceHelper  = require("./lib/helpers/NamespaceHelper");
import INamespaceHelper = require("./lib/helpers/INamespaceHelper");
import getobject        = require('getobject');

module config {
    var config:any,
        cache:any = {};

    export const DEBUG:boolean = true;
    export const SYSTEM_DIRECTORY:string = __dirname;
    export const BINARY_DIRECTORY:string = path.join(SYSTEM_DIRECTORY, "bin");
    export const SYSTEM_ENVIRONMENT:string = "/usr/bin/env";

    export const PROJECT_DIRECTORY:string = process.cwd();
    export const PROJECT_CONFIG:string    = path.join(PROJECT_DIRECTORY, "config.json");

    export const DEFAULT_PROJECT_HOSTNAME:string  = "localhost";
    export const DEFAULT_PROJECT_PORT:number      = 80;

    export const DEFAULT_PROJECT_LOGS_DIRECTORY:string            = path.join(PROJECT_DIRECTORY, "logs");
    export const DEFAULT_PROJECT_TEMPORARY_DIRECTORY:string       = path.join(PROJECT_DIRECTORY, "temp");
    export const DEFAULT_PROJECT_MEMORY_SOCKET:string             = "memory.sock";
    export const DEFAULT_PROJECT_STATIC_SOCKET:string             = "static.sock";

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
    export const DEFAULT_STATIC_METADATA_MEMORY_NAMESPACE:INamespaceHelper  = NamespaceHelper.parse(DEFAULT_STATIC_MEMORY_NAMESPACE.getValue(), DEFAULT_PROJECT_NAMESPACE_SEPARATOR).addToNamespace(["metadata"]);
    export const DEFAULT_STATIC_BINARY_MEMORY_NAMESPACE:INamespaceHelper    = NamespaceHelper.parse(DEFAULT_STATIC_MEMORY_NAMESPACE.getValue(), DEFAULT_PROJECT_NAMESPACE_SEPARATOR).addToNamespace(["binary"]);
    export const DEFAULT_STATIC_GZIP_MEMORY_NAMESPACE:INamespaceHelper      = NamespaceHelper.parse(DEFAULT_STATIC_MEMORY_NAMESPACE.getValue(), DEFAULT_PROJECT_NAMESPACE_SEPARATOR).addToNamespace(["gzip"]);
    export const DEFAULT_STATIC_LOCK_MEMORY_NAMESPACE:INamespaceHelper      = NamespaceHelper.parse(DEFAULT_STATIC_MEMORY_NAMESPACE.getValue(), DEFAULT_PROJECT_NAMESPACE_SEPARATOR).addToNamespace(["lock"]);

    export function getConfig():any {
        if (!isDefined(config)) {
            try {
                config = <any>require(PROJECT_CONFIG) || null;
            } catch (error) {
                config = null;
            }
        }
        return config;
    }

    export function getHostname():string {
        var configValue:string;
        if (!isDefined(cache.hostname)) {
            configValue = getobject.get(getConfig(), "hostname");
            cache.hostname = DEFAULT_PROJECT_HOSTNAME;
            if (configValue && isString(configValue)) {
                cache.hostname = configValue;
            }
        }
        return cache.hostname;
    }

    export function getPort():number {
        return 3001;
    }

    export function getTemporaryDirectory():string {
        var configValue:string;
        if (!isDefined(cache.temporaryDirectory)) {
            configValue = getobject.get(getConfig(), "temporary.directory");
            cache.temporaryDirectory = DEFAULT_PROJECT_TEMPORARY_DIRECTORY;
            if (configValue && isString(configValue)) {
                cache.temporaryDirectory = configValue;
            }
            if (!path.isAbsolute(cache.temporaryDirectory)) {
                cache.temporaryDirectory = path.join(PROJECT_DIRECTORY, cache.temporaryDirectory);
            }
            cache.temporaryDirectory = path.resolve(cache.temporaryDirectory);
            if (path.relative(PROJECT_DIRECTORY, cache.temporaryDirectory).slice(0, 2) === "..") {
                cache.temporaryDirectory = DEFAULT_PROJECT_TEMPORARY_DIRECTORY;
            }
        }
        return cache.temporaryDirectory;
    }

    export function getMemorySocket():string {
        var configValue:string;
        if (!isDefined(cache.memorySocket)) {
            configValue = getobject.get(getConfig(), "temporary.memory");
            cache.memorySocket = path.join(getTemporaryDirectory(), DEFAULT_PROJECT_MEMORY_SOCKET);
            if (configValue && isString(configValue)) {
                cache.memorySocket = configValue;
            }
            if (!path.isAbsolute(cache.memorySocket)) {
                cache.memorySocket = path.join(getTemporaryDirectory(), cache.memorySocket);
            }
            cache.memorySocket = path.resolve(cache.memorySocket);
            if (path.relative(getTemporaryDirectory(), cache.memorySocket).slice(0, 2) === "..") {
                cache.memorySocket = path.join(getTemporaryDirectory(), DEFAULT_PROJECT_MEMORY_SOCKET);
            }
        }
        return cache.memorySocket;
    }

    export function getStaticSocket():string {
        var configValue:string;
        if (!isDefined(cache.staticSocket)) {
            configValue = getobject.get(getConfig(), "temporary.static");
            cache.staticSocket = path.join(getTemporaryDirectory(), DEFAULT_PROJECT_MEMORY_SOCKET);
            if (configValue && isString(configValue)) {
                cache.staticSocket = configValue;
            }
            if (!path.isAbsolute(cache.staticSocket)) {
                cache.staticSocket = path.join(getTemporaryDirectory(), cache.staticSocket);
            }
            cache.staticSocket = path.resolve(cache.staticSocket);
            if (path.relative(getTemporaryDirectory(), cache.staticSocket).slice(0, 2) === "..") {
                cache.staticSocket = path.join(getTemporaryDirectory(), DEFAULT_PROJECT_MEMORY_SOCKET);
            }
        }
        return cache.staticSocket;
    }

    export function getLogsDirectory():string {
        var configValue:string;
        if (!isDefined(cache.logsDirectory)) {
            configValue = getobject.get(getConfig(), "logs.directory");
            cache.logsDirectory = DEFAULT_PROJECT_LOGS_DIRECTORY;
            if (configValue && isString(configValue)) {
                cache.logsDirectory = configValue;
            }
            if (!path.isAbsolute(cache.logsDirectory)) {
                cache.logsDirectory = path.join(PROJECT_DIRECTORY, cache.logsDirectory);
            }
            cache.logsDirectory = path.resolve(cache.logsDirectory);
            if (path.relative(PROJECT_DIRECTORY, cache.logsDirectory).slice(0, 2) === "..") {
                cache.logsDirectory = DEFAULT_PROJECT_LOGS_DIRECTORY;
            }
        }
        return cache.logsDirectory;
    }

    export function getMemoryLog():string {

    }

    export function getStaticLog():string {

    }

    export function getPublicDirectory():string {
        var configValue:string;
        if (!isDefined(cache.publicDirectory)) {
            configValue = getobject.get(getConfig(), "publicDirectory");
            cache.publicDirectory = DEFAULT_PROJECT_PUBLIC_DIRECTORY;
            if (configValue && isString(configValue)) {
                cache.publicDirectory = configValue;
            }
            if (!path.isAbsolute(cache.publicDirectory)) {
                cache.publicDirectory = path.join(PROJECT_DIRECTORY, cache.publicDirectory);
            }
            cache.publicDirectory = path.resolve(cache.publicDirectory);
            if (path.relative(PROJECT_DIRECTORY, cache.publicDirectory).slice(0, 2) === "..") {
                cache.publicDirectory = DEFAULT_PROJECT_PUBLIC_DIRECTORY;
            }
        }
        return cache.publicDirectory;
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

}

export = config;
