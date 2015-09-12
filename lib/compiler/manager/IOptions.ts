import IClientOptions = require("../client/IOptions");

interface IOptions extends IClientOptions {
    numberOfProcesses: number;
    sourcesDirectory: string;
}

export = IOptions;
