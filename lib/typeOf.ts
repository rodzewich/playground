function typeOf(value:any):string {
    var type:string = String(Object.prototype.toString.call(value) || '').slice(8, -1) || 'Object',
        types:string[] = ['Arguments', 'Array', 'Boolean', 'Date', 'Error', 'Function', 'Null', 'Number', 'Object', 'String', 'Undefined'];

    if (types.indexOf(type) !== -1) {
        type = type.toLowerCase();
    }
    return type;
}

export = typeOf;
