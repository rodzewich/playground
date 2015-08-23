interface IRequest {
    filename: string;
    sourcesDirectory: string;
    errorBackgroundColor: string;
    errorTextColor: string;
    errorBlockPadding: string;
    errorFontSize: string;
    useCache: boolean;
}

export = IRequest;
