interface IInformation {
    pid:number;
    gid:number;
    uid:number;
    cwd:string;
    arch:string;
    uptime:number;
    platform:string;
    version:string;
    execPath:string;
    execArgv:string[];
    memoryUsage:{
        rss:number;
        heapTotal:number;
        heapUsed:number;
    };
}

export = IInformation;
