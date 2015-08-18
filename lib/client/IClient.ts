interface IClient {
    connect(callback:(errors?:Error[]) => void): void;
    disconnect(callback:(errors?:Error[]) => void): void;
}

export = IClient;
