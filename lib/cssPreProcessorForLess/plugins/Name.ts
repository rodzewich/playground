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

}

export = Name;
