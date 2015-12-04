import {isTrue} from "../../utils/common";

export interface ICacheHelper {
    setIsUsed(value:any):void;
    getIsUsed():boolean;
    isUsed():boolean;
}

export class CacheHelper implements ICacheHelper {

    private _use:boolean = false;

    public setIsUsed(value:any):void {
        this._use = isTrue(value);
    }

    public getIsUsed():boolean {
        return !!this._use;
    }

    public isUsed():boolean {
        return this.getIsUsed();
    }

}
