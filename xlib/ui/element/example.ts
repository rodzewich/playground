import tags = require("factory");

var canvas:IElement = tags.div({
    id    : "id",
    items : [
        tags.table({
            id    : "component-table",
            items : [
                tags.caption({
                    text : "Table caption"
                }),
                tags.tbody({
                    items : [
                        tags.tr({
                            items : [
                                tags.td({
                                    text : "text1"
                                }),
                                tags.td({
                                    text : "text2"
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    ]
});

canvas.toElement(document);
canvas.toString();