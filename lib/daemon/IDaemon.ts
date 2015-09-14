interface IDaemon {
    start(callback?:(errors:Error[]) => void): void;
    stop(callback?:() => void): void;
}

export = IDaemon;
