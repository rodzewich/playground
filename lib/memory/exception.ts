import {
    IOptions   as IOptionsBase,
    IObject    as IObjectBase,
    IException as IExceptionBase,
    Exception  as ExceptionBase,
} from "../exception";

export interface IOptions extends IOptionsBase {
}

export interface IObject extends IObjectBase {
}

export interface IException extends IExceptionBase {
}

export class Exception extends ExceptionBase implements IException {

    protected _class:any = Exception;

    public toObject():IObject {
        return super.toObject();
    }

}
