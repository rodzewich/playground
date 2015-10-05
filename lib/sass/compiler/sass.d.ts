/// <reference path="../../../types/node/node.d.ts" />

declare module "node-sass" {

    export interface Options {
        file?: string;
        data?: string;
        functions?: { [key: string]: Function };
        includePaths?: string[];
        indentedSyntax?: boolean;
        indentType?: string;
        indentWidth?: number;
        linefeed?: string;
        omitSourceMapUrl?: boolean;
        outFile?: string;
        outputStyle?: string;
        precision?: number;
        sourceComments?: boolean;
        sourceMap?: boolean | string;
        sourceMapContents?: boolean;
        sourceMapEmbed?: boolean;
        sourceMapRoot?: boolean;
    }

    export interface SassError extends Error {
        message: string;
        line: number;
        column: number;
        status: number;
        file: string;
    }

    export interface Result {
        css: Buffer;
        map: Buffer;
        stats: {
            entry: string;
            start: number;
            end: number;
            duration: number;
            includedFiles: string[];
        }
    }

    export function render(options: Options, callback: (err: SassError, result: Result) => any): void;
    export function renderSync(options: Options): Result;

}