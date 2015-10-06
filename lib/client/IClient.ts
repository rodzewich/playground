interface IClient {
    location:string;
    connect(callback:(errors:Error[]) => void): void;
    disconnect(callback:(errors:Error[]) => void): void;
    getLocation():string;
    setLocation(value:string):void;
}

export = IClient;
