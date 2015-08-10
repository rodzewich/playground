module xlib.ui.element {

  setTimeout(() => {

    element.ready(() => {

      var component = element.table({
        id: "element-123",
        classes: ["xlib-element", "user-factory"],
        items: [
          element.thead({
            classes: ["xlib-head", "xlib-inner"],
            items: [
              element.tr({items: [
                element.th({
                  styles: {
                    borderRadius: "11px",
                    color: "red"
                  },
                  text: "text\n<strong>1</strong>"
                }),
                element.th({
                  text: "text<strong>2</strong>"
                }),
                element.th({
                  html: "text<strong>3</strong>"
                })
              ]})
            ]
          }),
          element.tbody({
            classes: ["xlib-body", "xlib-inner"]
          }),
          element.tfoot({
            classes: ["xlib-foot", "xlib-inner"],
            items: [
              element.tr({items: [
                element.td({
                  text: "button"
                })
              ]})
            ]
          })
        ]

      });

      console.log(component.content());

    });

  }, 0);

}