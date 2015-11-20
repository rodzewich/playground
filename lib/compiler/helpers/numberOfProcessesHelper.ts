import {isDefined} from "../../utils";

export interface INumberOfProcessesHelper {
    setNumber(value:number):void;
    getNumber():number;
}

export class NumberOfProcessesHelper implements INumberOfProcessesHelper {

    private _number:number = 1;

    constructor(value?:number) {
        if (isDefined(value)) {
            this.setNumber(value);
        }
    }

    public setNumber(value:number):void {
        this._number = value;
    }

    public getNumber():number {
        return this._number;
    }

}