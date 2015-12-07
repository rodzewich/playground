import {isDefined} from "../../utils/common";

export interface IUrlHelper {
    getUrl():string;
    setUrl(url:string):void;
}

export class UrlHelper implements IUrlHelper {
    private _url:string;
    constructor(url?:string) {
        if (isDefined(url)) {
            this.setUrl(url);
        }
    }
    public getUrl():string {
        return this._url;
    }
    public setUrl(url:string):void {
        this._url = url;
    }
}
