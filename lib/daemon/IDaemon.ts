import IException = require("../exception/IException");

interface IDaemon {
    location: string;
    started:boolean;
    starting:boolean;
    stopped:boolean;
    stopping:boolean;
    start(callback?:(errors:IException[]) => void): void;
    stop(callback?:(errors:IException[]) => void): void;
    isStarting():boolean;
    isStopping():boolean;
    isStarted():boolean;
    isStopped():boolean;
    getLocation():string;
    setLocation(value:string):void;
}

export = IDaemon;
