import {isDefined} from "../../utils/common";

export interface IFilenameHelper {
    getFilename():string;
    setFilename(filename:string):void;
}

export class FilenameHelper implements IFilenameHelper {

    private _filename:string;

    constructor(filename?:string) {
        if (isDefined(filename)) {
            this.setFilename(filename);
        }
    }

    public getFilename():string {
        return this._filename || null;
    }

    public setFilename(filename:string):void {
        this._filename = filename;
    }

}