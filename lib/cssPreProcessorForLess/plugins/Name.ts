import Category = require("Category");

class Name {

    private _name:string;

    private _category:Category;

    constructor(name:string, category:Category) {
        this._name = name;
        this._category = category;
    }

    public getName():string {
        return this._name;
    }

    public getCategory():Category {
        return this._category;
    }

    public toString():string {
        return this.getName();
    }

    public static ADVANCED_COLOR_FUNCTIONS:Name = new Name("advanced-color-functions", Category.FUNCTIONS);
    public static NPM_IMPORT:Name = new Name("npm-import", Category.IMPORTERS);
    public static BOOTSTRAP:Name = new Name("bootstrap", Category.IMPORTERS);
    public static CARDINAL:Name = new Name("cardinal", Category.IMPORTERS);
    public static FLEXBOXGRID:Name = new Name("flexboxgrid", Category.IMPORTERS);
    public static IONIC:Name = new Name("ionic", Category.IMPORTERS);
    public static CUBEHELIX:Name = new Name("cubehelix", Category.FUNCTIONS);
    public static LESSHAT:Name = new Name("lesshat", Category.IMPORTERS);
    public static SKELETON:Name = new Name("skeleton", Category.IMPORTERS);
    public static LISTS:Name = new Name("lists", Category.FUNCTIONS);
    public static BOWER_RESOLVE:Name = new Name("bower-resolve", Category.IMPORTERS);
    public static AUTOPREFIX:Name = new Name("autoprefix", Category.POSTPROCESSORS);

    public static PRIORITIES:Name[] = [
        Name.ADVANCED_COLOR_FUNCTIONS,
        Name.NPM_IMPORT,
        Name.BOOTSTRAP,
        Name.CARDINAL,
        Name.FLEXBOXGRID,
        Name.IONIC,
        Name.CUBEHELIX,
        Name.LESSHAT,
        Name.SKELETON,
        Name.LISTS,
        Name.AUTOPREFIX
    ];

}

export = Name;
