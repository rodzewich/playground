
export interface IUsedDocument {
    getDocument(): Document;
    setDocument(value:Document): void;
}

export interface IUsedTimeout {
    setTimeout(value:number): void;
    getTimeout(): number;
}

export interface IUsedFactory<T> {
    getFactory(): T;
    setFactory(value:T): void;
}

export interface IUsedEncoding {
    getEncoding(): string;
    setEncoding(value:any): void;
}

export interface IUsedValue<T> {
    getValue(): T;
    setValue(value:T): void;
}

export interface IUsedStrict {
    isStrict(): boolean;
    setStrict(value:boolean): void;
}

export interface IUsesDisabled {
    isDisabled(): boolean;
    getDisabled(): boolean;
    setDisabled(value:boolean): void;
}

export interface IUsesDecorator<D, C> {
    setDecorator(value:D): void;
    getDecorator(): D;
    getContent(): C;
}

export interface IStringify {
    toString(): string;
}

export interface IUsedBuilder<S,G> {
    setBuilder(value:S): void;
    getBuilder(): G;
}

/**
 * @param value
 * @returns {string}
 */
export function typeOf(value:any):string {
    var type:string = String(Object.prototype.toString.call(value) || '').slice(8, -1) || 'Object',
        types:string[] = ['Arguments', 'Array', 'Boolean', 'Date', 'Error', 'Function', 'Null', 'Number', 'Object', 'String', 'Undefined'];
    if (types.indexOf(type) !== -1) {
        type = type.toLowerCase();
    }
    return type;
}

/**
 * @param value
 * @returns {boolean}
 */
export function isTrue(value:any):boolean {
    var type:string = typeOf(value),
        result:boolean;
    if (type === "null" || type === "undefined") {
        result = false;
    } else if (type === "string") {
        result = ["false", "off", "no", "0", ""].indexOf(value.toLowerCase()) === -1;
    } else if (type === "number") {
        result = value !== 0;
    } else if (type === "boolean") {
        result = value;
    } else {
        result = isTrue(String(value || ""));
    }
    return result;
}

/**
 * @param value
 * @returns {boolean}
 */
export function isFalse(value:any):boolean {
    return !isTrue(value);
}

/**
 * @param value
 * @returns {boolean}
 */
export function isEmpty(value:any):boolean {
    var type:string = typeOf(value),
        result:boolean,
        prop:string;
    if (type === "array") {
        result = value.length === 0;
    } else if (type === "object") {
        result = true;
        for (prop in value) {
            if (value.hasOwnProperty(prop)) {
                result = false;
                break;
            }
        }
    } else {
        result = !!value;
    }
    return result;
}

export function clone(object:any, recursive:boolean = false):any {
    var result:any,
        index:number,
        length:number,
        property:string,
        value:any;
    if (typeOf(recursive) === 'string') {
        recursive = ['false', 'no', 'off', '0'].
            indexOf(String(recursive).toLowerCase()) === -1;
    } else if (typeOf(recursive) !== 'boolean') {
        recursive = !!recursive;
    }
    if (typeOf(object) === 'object') {
        result = {};
        for (property in object) {
            if (object.hasOwnProperty(property)) {
                value = object[property];
                if (recursive && (typeOf(value) === 'object' || typeOf(value) === 'array' || typeOf(value) === 'arguments' || typeOf(value) === 'date')) {
                    result[property] = clone(value, true);
                } else {
                    result[property] = object[property];
                }
            }
        }
    } else if (typeOf(object) === 'date') {
        result = new Date(Number(object));
    } else if (typeOf(object) === 'arguments' || typeOf(object) === 'array') {
        result = [];
        length = object.length;
        for (index = 0; index < length; index += 1) {
            value = object[index];
            if (recursive && (typeOf(value) === 'object' || typeOf(value) === 'array' || typeOf(value) === 'arguments' || typeOf(value) === 'date')) {
                result[index] = clone(value, true);
            } else {
                result[index] = value;
            }
            result[index] = object[index];
        }
    } else {
        result = {};
    }
    return result;
}

export function extend(object:any, ...objects:any[]):Object {
    if (typeOf(object) !== 'object') {
        object = {};
    }
    for (var index = 0; index < objects.length; index++) {
        for (var property in objects[index]) {
            if (objects[index].hasOwnProperty(property)) {
                // todo: сделать рекурсивное сращивание объектов
                object[property] = objects[index][property];
            }
        }
    }
    return object;
}

/**
 * @param value
 * @returns {string}
 */
export function trim(value:any):string {
    return String(value || "").
        replace(/\s+/m, " ").
        replace(/^\s+/, "").
        replace(/\s+$/, "");
}

export function forEach(object:any, callback:(value?:any, key?:any) => void):void {
    var index:number,
        length:number,
        property:string;
    if (typeOf(callback) === 'function' &&
        typeOf(object) === 'array') {
        length = object.length;
        for (index = 0; index < length; index++) {
            callback(object[index], index);
        }
    } else if (typeOf(callback) === 'function' &&
        typeOf(object) === 'object') {
        for (property in object) {
            if (object.hasOwnProperty(property)) {
                callback(object[property], property);
            }
        }
    }
}
