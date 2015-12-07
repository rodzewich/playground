import {IParamsHelper, ParamsHelper} from "./paramsHelper";

export interface ICookieHelper extends IParamsHelper {
}

export class CookieHelper extends ParamsHelper implements ICookieHelper {
}
