

function router(options, next:() => void):void {
    var headers:any = request.headers || {},
        gzipAllowed:boolean = String(headers["accept-encoding"]).split(", ").indexOf("gzip") !== -1;
    staticInstance.getContent(pathname, (errors:IStaticException[], result:IStaticResponse):void => {
        var modified:number = Date.parse(request.headers["if-modified-since"]),
            date:number = result && result.date ? 1000 * result.date : 0;
        if (errors && errors.length) {
            response.setHeader("Content-Type", "text/html; charset=utf-8");
            response.writeHead(500);
            response.end(error500({
                serverName    : config.getServerName(),
                serverVersion : config.getServerVersion()
            }, errors));
        } else if (modified && modified === date) {
            response.writeHead(304);
            response.end();
        } else if (result && result.zipContent && gzipAllowed) {
            response.writeHead(200);
            response.setHeader("Content-Type", result.type);
            response.setHeader("Last-Modified", new Date(result.date * 1000)).toUTCString();
            response.setHeader("Content-Encoding", "gzip");
            response.end(result.zipContent);
        } else if (result && result.content) {
            response.writeHead(200);
            response.setHeader("Content-Type", result.type);
            response.setHeader("Last-Modified", new Date(result.date * 1000)).toUTCString();
            response.end(result.content);
        } else {
            next();
        }
    });
}

export = router;
