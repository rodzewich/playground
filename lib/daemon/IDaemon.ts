import IException = require("../exception/IException");

interface IDaemon {
    location: string;
    started:boolean;
    starting:boolean;
    stopped:boolean;
    stopping:boolean;
    debug:boolean;
    start(callback?:(errors:IException[]) => void):void;
    stop(callback?:(errors:IException[]) => void):void;
    isStarting():boolean;
    isStopping():boolean;
    isStarted():boolean;
    isStopped():boolean;
    getLocation():string;
    setLocation(value:string):void;
    isDebug():boolean;
    getIsDebug():boolean;
    setIsDebug(value:boolean):void;
}

export = IDaemon;
