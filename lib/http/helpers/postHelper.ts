/// <reference path="../../../types/node/node.d.ts" />

import * as qs from "querystring";
import {isString} from "../../utils/common";
import {IParamsHelper, ParamsHelper} from "./paramsHelper";

export interface IPostHelper extends IParamsHelper {
}

export class PostHelper extends ParamsHelper implements IPostHelper {

	constructor(data:string) {
		var params:any = {};
		try {
			if (isString(data) && data.slice(0, 1) === "{") {
				params = JSON.parse(data);
			} else if (isString(data)) {
				params = qs.parse(data);
			}
		} catch (error) {
		}
		super(params);
	}

}
