import factory = require("../factory");
import ITagsList = require("../ITagsList");

interface IMap {
    canvas?:IDivElement;
    tbody?:ITBodyElement;
    tfoot?:ITFootElement;
    botton?:IBottonElement;
}

factory((tags:ITagsList):void => {

    var map:IMap = {};

    tags.div({
        styles : {
            border : "2px solid red",
            fontWeight : "bold"
        },
        classes : [
            "xlib-bold",
            "xlib-italic"
        ],
        name : "canvas",
        map : map,
        items: [
            tags.table({
                items : [
                    tags.caption({
                        text: lang("PROFILE.TABLE_NAME", "Name")
                    }),
                    tags.thead({
                        items: [
                            tags.tr({
                                items: [
                                    tags.th({
                                        text: lang("PROFILE.USER_NAME", "User")
                                    }),
                                    tags.th({
                                        text: lang("PROFILE.RESULT")
                                    })
                                ]
                            })
                        ]
                    }),
                    tags.tbody({
                        items: [
                            tags.tr({
                                items: [
                                    tags.td({
                                        text: "sfdfsdfs"
                                    }),
                                    tags.td({
                                        text: "sfdfsdfs"
                                    })
                                ]
                            })
                        ]
                    }),
                    tags.tfoot({
                        items: [
                            tags.tr({
                                items: [
                                    tags.td({
                                        colspan: 2,
                                        items: [
                                            tags.botton({
                                                text: lang("COMMON.APPLY")
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            tags.button({
                name : "button",
                text : lang("COMMON.UPGRADE"),
                listeners : {
                    click(event:IClickEvent): void {

                    },
                    dblClick(event:IDblClickEvent): void {

                    },
                    mouseOver(event:IMouseOverEvent): void {

                    }
                }
            })
        ]
    });

    if (options.allowLocalHandlers) {
        map.botton.onClick((event:IClickEvent):void => {
            map.canvas.hide();
        });
    }

});