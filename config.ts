/// <reference path="./types/node/node.d.ts" />

import path             = require("path");
import Separator        = require("./lib/helpers/Separator");
import NamespaceHelper  = require("./lib/helpers/NamespaceHelper");
import INamespaceHelper = require("./lib/helpers/INamespaceHelper");

export const SERVER_DIRECTORY:string = __dirname;
export const PROJECT_DIRECTORY:string = process.cwd();
export const DEFAULT_TEMPORARY_DIRECTORY:string = path.join(PROJECT_DIRECTORY, "temp");
export const DEFAULT_PUBLIC_DIRECTORY:string = path.join(PROJECT_DIRECTORY, "public");
export const DEFAULT_MEMORY_SOCKET_LOCATION:string = path.join(DEFAULT_TEMPORARY_DIRECTORY, "memory.sock");
export const DEFAULT_CSS_SOCKET_LOCATION:string = path.join(DEFAULT_TEMPORARY_DIRECTORY, "css.sock");
export const DEFAULT_LESS_SOCKET_LOCATION:string = path.join(DEFAULT_TEMPORARY_DIRECTORY, "less.sock");
export const DEFAULT_SASS_SOCKET_LOCATION:string = path.join(DEFAULT_TEMPORARY_DIRECTORY, "sass.sock");
export const DEFAULT_STYLUS_SOCKET_LOCATION:string = path.join(DEFAULT_TEMPORARY_DIRECTORY, "stylus.sock");
export const DEFAULT_NAMESPACE_SEPARATOR:Separator = Separator.DOT;
export const DEFAULT_STATIC_MEMORY_METADATA_LOCATION:string = DEFAULT_MEMORY_SOCKET_LOCATION;
export const DEFAULT_STATIC_MEMORY_BINARY_LOCATION:string = DEFAULT_MEMORY_SOCKET_LOCATION;
export const DEFAULT_STATIC_MEMORY_GZIP_LOCATION:string = DEFAULT_MEMORY_SOCKET_LOCATION;
export const DEFAULT_STATIC_MEMORY_LOCK_LOCATION:string = DEFAULT_MEMORY_SOCKET_LOCATION;
export const DEFAULT_STATIC_MEMORY_NAMESPACE:INamespaceHelper = new NamespaceHelper(["static"], DEFAULT_NAMESPACE_SEPARATOR);
export const DEFAULT_STATIC_METADATA_MEMORY_NAMESPACE:string = NamespaceHelper.parse(DEFAULT_STATIC_MEMORY_NAMESPACE.getValue(), DEFAULT_NAMESPACE_SEPARATOR).addToNamespace(["metadata"]);
export const DEFAULT_STATIC_BINARY_MEMORY_NAMESPACE:string = NamespaceHelper.parse(DEFAULT_STATIC_MEMORY_NAMESPACE.getValue(), DEFAULT_NAMESPACE_SEPARATOR).addToNamespace(["binary"]);
export const DEFAULT_STATIC_GZIP_MEMORY_NAMESPACE:string = NamespaceHelper.parse(DEFAULT_STATIC_MEMORY_NAMESPACE.getValue(), DEFAULT_NAMESPACE_SEPARATOR).addToNamespace(["gzip"]);
export const DEFAULT_STATIC_LOCK_MEMORY_NAMESPACE:string = NamespaceHelper.parse(DEFAULT_STATIC_MEMORY_NAMESPACE.getValue(), DEFAULT_NAMESPACE_SEPARATOR).addToNamespace(["lock"]);
