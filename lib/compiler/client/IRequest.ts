interface IRequest {
    filename:string;
    sourcesDirectory:string;
    errorsBackgroundColor:string;
    errorsTextColor:string;
    errorsBlockPadding:string;
    errorsFontSize:string;
    webRootDirectory:string;
    useCache:boolean;
}

export = IRequest;
