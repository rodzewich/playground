interface IRequest {
    filename: string;
    sourcesDirectory: string;
    errorBackgroundColor: string;
    errorTextColor: string;
    errorBlockPadding: string;
    errorFontSize: string;
    webRootDirectory: string;
    useCache: boolean;
}

export = IRequest;
