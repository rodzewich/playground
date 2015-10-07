import IException = require("../exception/IException");

interface IDaemon {
    location: string;
    start(callback?:(errors:IException[]) => void): void;
    stop(callback?:(errors:IException[]) => void): void;
    getLocation():string;
    setLocation(value:string):void;
}

export = IDaemon;
