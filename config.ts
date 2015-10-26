/// <reference path="./types/node/node.d.ts" />

import path = require("path");
import Exception = require("./lib/exception/Exception");

export const SERVER_DIRECTORY:string = __dirname;
export const DEFAULT_MEMORY_SOCKET_LOCATION:string = path.join(DEFAULT_TEMPORARY_DIRECTORY, "memory.sock");
export const DEFAULT_CSS_SOCKET_LOCATION:string = path.join(DEFAULT_TEMPORARY_DIRECTORY, "css.sock");
export const DEFAULT_LESS_SOCKET_LOCATION:string = path.join(DEFAULT_TEMPORARY_DIRECTORY, "less.sock");
export const DEFAULT_SASS_SOCKET_LOCATION:string = path.join(DEFAULT_TEMPORARY_DIRECTORY, "sass.sock");
export const DEFAULT_STYLUS_SOCKET_LOCATION:string = path.join(DEFAULT_TEMPORARY_DIRECTORY, "stylus.sock");
export const PROJECT_DIRECTORY:string = process.cwd();
export const DEFAULT_TEMPORARY_DIRECTORY:string = path.join(PROJECT_DIRECTORY, "temp");
export const DEFAULT_PUBLIC_DIRECTORY:string = path.join(PROJECT_DIRECTORY, "public");
