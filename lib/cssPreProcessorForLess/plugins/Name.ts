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

}

export = Name;
