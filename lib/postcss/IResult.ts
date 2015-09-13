import IWarning = require("./IWarning");

interface IResult {
    messages: IWarning[];
    result: string;
    map: any;
}

export = IResult;
