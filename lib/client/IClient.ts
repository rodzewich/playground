interface IClient {
    connect(callback:(error?:Error) => void): void;
    disconnect(callback:(error?:Error) => void): void;
}

export = IClient;
