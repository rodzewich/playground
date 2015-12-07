
let registered:{[index:string]:IMethodHelper} = {},
	system:boolean = false;

export interface IMethodHelper {
	equal(value:string|IMethodHelper):boolean;
	toString():string;
}

export class MethodHelper implements IMethodHelper {
	private _name:string;
	private _value:string;
	constructor(name:string, value:string) {
		this._name = name;
		this._value = value;
		if (system) {
			registered[name] = this;
		}
	}
	public equal(value:string|IMethodHelper):boolean {
		return this.toString().toLowerCase() === String(value).toLowerCase();
	}
	public toString():string {
		return this._value;
	}
}

export module methods {
	system = true;
	export const GET:IMethodHelper = new MethodHelper("get", "GET");
	export const OPTIONS:IMethodHelper = new MethodHelper("options", "OPTIONS");
	export const HEAD:IMethodHelper = new MethodHelper("head", "HEAD");
	export const POST:IMethodHelper = new MethodHelper("post", "POST");
	export const PUT:IMethodHelper = new MethodHelper("put", "PUT");
	export const DELETE:IMethodHelper = new MethodHelper("delete", "DELETE");
	export const TRACE:IMethodHelper = new MethodHelper("trace", "TRACE");
	export const CONNECT:IMethodHelper = new MethodHelper("connect", "CONNECT");
	system = false;
}

export function find(name:string) {
	return registered[String(name).toLowerCase()] || methods.GET;
}
