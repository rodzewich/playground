class Category {

    private _category:string;

    constructor(category:string) {
        this._category = category;
    }

    public getCategory():string {
        return this._category;
    }

    public toString():string {
        return this.getCategory();
    }

    public static FUNCTIONS:Category = new Category("functions");

    public static IMPORTERS:Category = new Category("importers");

    public static POSTPROCESSORS:Category = new Category("postprocessors");

}

export = Category;
