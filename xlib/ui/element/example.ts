import tags = require("factory");
import events = require("events");

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
                                    items : [
                                        tags.button({
                                            text : lang("COMMON.UPGRADE"),
                                            onClick(event):void {
                                                alert(lang("COMMON.CLICK"));
                                            },
                                            onDblClick():void {

                                            },
                                            onMouseOver():void {

                                            }
                                        })
                                    ]
                                })
                            ]
                        })
                    ]
                })
            ]
        })
    ]
});
canvas.onClick((event):void => {

});

canvas.removeAllListeners();
canvas.removeListener(events.button.CLICK);
canvas.removeListener(evnets.button.MOUSE_OVER, callback);
canvas.addListener(events.button.CLICK, ():void => {

});
canvas.fireListener(evnets.button.CLICK, new ClickEvent());

canvas.toElement(document);
canvas.toString();