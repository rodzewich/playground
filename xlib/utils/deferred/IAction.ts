
interface IAction {
    (success:() => void, error:(message:string) => void, complete:() => void): void;
    (success:() => void, error:(message:string[]) => void, complete:() => void): void;
    (success:() => void, error:(message:Error) => void, complete:() => void): void;
    (success:() => void, error:(message:Error[]) => void, complete:() => void): void;
    (success:() => void, error:(message:string) => void): void;
    (success:() => void, error:(message:string[]) => void): void;
    (success:() => void, error:(message:Error) => void): void;
    (success:() => void, error:(message:Error[]) => void): void;
    (success:() => void): void;
}

export = IAction;
