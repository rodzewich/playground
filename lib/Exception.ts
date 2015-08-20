// todo: сделать нормальный stack

class Exception extends Error {

    public name:string = "Exception";

    public message:string;

    constructor(message?:string) {
        super();
        if (message) {
            this.message = message;
        }
    }

    public getName():string {
        return this.name;
    }

    public getMessage():string {
        return this.message;
    }

}

export = Exception;
