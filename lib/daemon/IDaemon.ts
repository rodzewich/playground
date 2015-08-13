interface IDaemon {
    start(callback?:(error?:Error) => void): void;
    stop(callback?:() => void): void;
}

export = IDaemon;
