
interface ITransport {
    load(filename:string, callback:(error?:Error) => void): void;
}

export = ITransport;
