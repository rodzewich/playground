function htmlEntities(value:string):string {
    return String(value).
        replace(/&/g, '&amp;').
        replace(/</g, '&lt;').
        replace(/>/g, '&gt;').
        replace(/"/g, '&quot;');
}

export = htmlEntities;
