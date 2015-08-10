/// <reference path="../../core.ts" />
/// <reference path="../../utils/dependency/Dependency.ts" />
/// <reference path="factory/IFactory.ts" />

module xlib.ui.element {

  import elements = element.elements;
  import Dependency = xlib.utils.dependency.Dependency;
  var loadedFactory: element.factory.IFactory<any>;

  export function ready(callback: () => void): void {
    function header() {
      setTimeout(() => {
        if (xlib.typeOf(callback) === "function") {
          callback();
        }
      }, 0);
    }
    if (loadedFactory) {
      header();
    } else {
      Dependency.create().load("dom:factory", (errors: Error[], instance: any) => {
        loadedFactory = <element.factory.IFactory<any>>instance;
        header();
      });
    }
  }

  function factory<T>(): element.factory.IFactory<T> {
    return loadedFactory;
  }

  export function a<T>(options?: elements.a.IOptions<T>): elements.a.IElement<T> {
    return <elements.a.IElement<T>>factory().createAElement(options);
  }

  export function abbr<T>(options?: elements.abbr.IOptions<T>): elements.abbr.IElement<T> {
    return <elements.abbr.IElement<T>>factory().createAbbrElement(options);
  }

  export function acronym<T>(options?: elements.acronym.IOptions<T>): elements.acronym.IElement<T> {
    return <elements.acronym.IElement<T>>factory().createAcronymElement(options);
  }

  export function address<T>(options?: elements.address.IOptions<T>): elements.address.IElement<T> {
    return <elements.address.IElement<T>>factory().createAddressElement(options);
  }

  export function area<T>(options?: elements.area.IOptions<T>): elements.area.IElement<T> {
    return <elements.area.IElement<T>>factory().createAreaElement(options);
  }

  export function b<T>(options?: elements.b.IOptions<T>): elements.b.IElement<T> {
    return <elements.b.IElement<T>>factory().createBElement(options);
  }

  export function base<T>(options?: elements.base.IOptions<T>): elements.base.IElement<T> {
    return <elements.base.IElement<T>>factory().createBaseElement(options);
  }

  export function bdo<T>(options?: elements.bdo.IOptions<T>): elements.bdo.IElement<T> {
    return <elements.bdo.IElement<T>>factory().createBdoElement(options);
  }

  export function big<T>(options?: elements.big.IOptions<T>): elements.big.IElement<T> {
    return <elements.big.IElement<T>>factory().createBigElement(options);
  }

  export function blockquote<T>(options?: elements.blockquote.IOptions<T>): elements.blockquote.IElement<T> {
    return <elements.blockquote.IElement<T>>factory().createBlockquoteElement(options);
  }

  export function body<T>(options?: elements.body.IOptions<T>): elements.body.IElement<T> {
    return <elements.body.IElement<T>>factory().createBodyElement(options);
  }

  export function br<T>(options?: elements.br.IOptions<T>): elements.br.IElement<T> {
    return <elements.br.IElement<T>>factory().createBrElement(options);
  }

  export function button<T>(options?: elements.button.IOptions<T>): elements.button.IElement<T> {
    return <elements.button.IElement<T>>factory().createButtonElement(options);
  }

  export function caption<T>(options?: elements.caption.IOptions<T>): elements.caption.IElement<T> {
    return <elements.caption.IElement<T>>factory().createCaptionElement(options);
  }

  export function cite<T>(options?: elements.cite.IOptions<T>): elements.cite.IElement<T> {
    return <elements.cite.IElement<T>>factory().createCiteElement(options);
  }

  export function code<T>(options?: elements.code.IOptions<T>): elements.code.IElement<T> {
    return <elements.code.IElement<T>>factory().createCodeElement(options);
  }

  export function col<T>(options?: elements.col.IOptions<T>): elements.col.IElement<T> {
    return <elements.col.IElement<T>>factory().createColElement(options);
  }

  export function colgroup<T>(options?: elements.colgroup.IOptions<T>): elements.colgroup.IElement<T> {
    return <elements.colgroup.IElement<T>>factory().createColgroupElement(options);
  }

  export function dd<T>(options?: elements.dd.IOptions<T>): elements.dd.IElement<T> {
    return <elements.dd.IElement<T>>factory().createDdElement(options);
  }

  export function del<T>(options?: elements.del.IOptions<T>): elements.del.IElement<T> {
    return <elements.del.IElement<T>>factory().createDelElement(options);
  }

  export function dfn<T>(options?: elements.dfn.IOptions<T>): elements.dfn.IElement<T> {
    return <elements.dfn.IElement<T>>factory().createDfnElement(options);
  }

  export function div<T>(options?: elements.div.IOptions<T>): elements.div.IElement<T> {
    return <elements.div.IElement<T>>factory().createDivElement(options);
  }

  export function dl<T>(options?: elements.dl.IOptions<T>): elements.dl.IElement<T> {
    return <elements.dl.IElement<T>>factory().createDlElement(options);
  }

  export function dt<T>(options?: elements.dt.IOptions<T>): elements.dt.IElement<T> {
    return <elements.dt.IElement<T>>factory().createDtElement(options);
  }

  export function em<T>(options?: elements.em.IOptions<T>): elements.em.IElement<T> {
    return <elements.em.IElement<T>>factory().createEmElement(options);
  }

  export function fieldset<T>(options?: elements.fieldset.IOptions<T>): elements.fieldset.IElement<T> {
    return <elements.fieldset.IElement<T>>factory().createFieldsetElement(options);
  }

  export function form<T>(options?: elements.form.IOptions<T>): elements.form.IElement<T> {
    return <elements.form.IElement<T>>factory().createFormElement(options);
  }

  export function h1<T>(options?: elements.h1.IOptions<T>): elements.h1.IElement<T> {
    return <elements.h1.IElement<T>>factory().createH1Element(options);
  }

  export function h2<T>(options?: elements.h2.IOptions<T>): elements.h2.IElement<T> {
    return <elements.h2.IElement<T>>factory().createH2Element(options);
  }

  export function h3<T>(options?: elements.h3.IOptions<T>): elements.h3.IElement<T> {
    return <elements.h3.IElement<T>>factory().createH3Element(options);
  }

  export function h4<T>(options?: elements.h4.IOptions<T>): elements.h4.IElement<T> {
    return <elements.h4.IElement<T>>factory().createH4Element(options);
  }

  export function h5<T>(options?: elements.h5.IOptions<T>): elements.h5.IElement<T> {
    return <elements.h5.IElement<T>>factory().createH5Element(options);
  }

  export function h6<T>(options?: elements.h6.IOptions<T>): elements.h6.IElement<T> {
    return <elements.h6.IElement<T>>factory().createH6Element(options);
  }

  export function head<T>(options?: elements.head.IOptions<T>): elements.head.IElement<T> {
    return <elements.head.IElement<T>>factory().createHeadElement(options);
  }

  export function hr<T>(options?: elements.hr.IOptions<T>): elements.hr.IElement<T> {
    return <elements.hr.IElement<T>>factory().createHrElement(options);
  }

  export function html<T>(options?: elements.html.IOptions<T>): elements.html.IElement<T> {
    return <elements.html.IElement<T>>factory().createHtmlElement(options);
  }

  export function i<T>(options?: elements.i.IOptions<T>): elements.i.IElement<T> {
    return <elements.i.IElement<T>>factory().createIElement(options);
  }

  export function img<T>(options?: elements.img.IOptions<T>): elements.img.IElement<T> {
    return <elements.img.IElement<T>>factory().createImgElement(options);
  }

  export function input<T>(options?: elements.input.IOptions<T>): elements.input.IElement<T> {
    return <elements.input.IElement<T>>factory().createInputElement(options);
  }

  export function ins<T>(options?: elements.ins.IOptions<T>): elements.ins.IElement<T> {
    return <elements.ins.IElement<T>>factory().createInsElement(options);
  }

  export function kbd<T>(options?: elements.kbd.IOptions<T>): elements.kbd.IElement<T> {
    return <elements.kbd.IElement<T>>factory().createKbdElement(options);
  }

  export function label<T>(options?: elements.label.IOptions<T>): elements.label.IElement<T> {
    return <elements.label.IElement<T>>factory().createLabelElement(options);
  }

  export function legend<T>(options?: elements.legend.IOptions<T>): elements.legend.IElement<T> {
    return <elements.legend.IElement<T>>factory().createLegendElement(options);
  }

  export function li<T>(options?: elements.li.IOptions<T>): elements.li.IElement<T> {
    return <elements.li.IElement<T>>factory().createLiElement(options);
  }

  export function link<T>(options?: elements.link.IOptions<T>): elements.link.IElement<T> {
    return <elements.link.IElement<T>>factory().createLinkElement(options);
  }

  export function map<T>(options?: elements.map.IOptions<T>): elements.map.IElement<T> {
    return <elements.map.IElement<T>>factory().createMapElement(options);
  }

  export function meta<T>(options?: elements.meta.IOptions<T>): elements.meta.IElement<T> {
    return <elements.meta.IElement<T>>factory().createMetaElement(options);
  }

  export function noscript<T>(options?: elements.noscript.IOptions<T>): elements.noscript.IElement<T> {
    return <elements.noscript.IElement<T>>factory().createNoscriptElement(options);
  }

  export function object<T>(options?: elements.object.IOptions<T>): elements.object.IElement<T> {
    return <elements.object.IElement<T>>factory().createObjectElement(options);
  }

  export function ol<T>(options?: elements.ol.IOptions<T>): elements.ol.IElement<T> {
    return <elements.ol.IElement<T>>factory().createOlElement(options);
  }

  export function optgroup<T>(options?: elements.optgroup.IOptions<T>): elements.optgroup.IElement<T> {
    return <elements.optgroup.IElement<T>>factory().createOptgroupElement(options);
  }

  export function option<T>(options?: elements.option.IOptions<T>): elements.option.IElement<T> {
    return <elements.option.IElement<T>>factory().createOptionElement(options);
  }

  export function p<T>(options?: elements.p.IOptions<T>): elements.p.IElement<T> {
    return <elements.p.IElement<T>>factory().createPElement(options);
  }

  export function param<T>(options?: elements.param.IOptions<T>): elements.param.IElement<T> {
    return <elements.param.IElement<T>>factory().createParamElement(options);
  }

  export function pre<T>(options?: elements.pre.IOptions<T>): elements.pre.IElement<T> {
    return <elements.pre.IElement<T>>factory().createPreElement(options);
  }

  export function q<T>(options?: elements.q.IOptions<T>): elements.q.IElement<T> {
    return <elements.q.IElement<T>>factory().createQElement(options);
  }

  export function samp<T>(options?: elements.samp.IOptions<T>): elements.samp.IElement<T> {
    return <elements.samp.IElement<T>>factory().createSampElement(options);
  }

  export function script<T>(options?: elements.script.IOptions<T>): elements.script.IElement<T> {
    return <elements.script.IElement<T>>factory().createScriptElement(options);
  }

  export function select<T>(options?: elements.select.IOptions<T>): elements.select.IElement<T> {
    return <elements.select.IElement<T>>factory().createSelectElement(options);
  }

  export function small<T>(options?: elements.small.IOptions<T>): elements.small.IElement<T> {
    return <elements.small.IElement<T>>factory().createSmallElement(options);
  }

  export function span<T>(options?: elements.span.IOptions<T>): elements.span.IElement<T> {
    return <elements.span.IElement<T>>factory().createSpanElement(options);
  }

  export function strong<T>(options?: elements.strong.IOptions<T>): elements.strong.IElement<T> {
    return <elements.strong.IElement<T>>factory().createStrongElement(options);
  }

  export function style<T>(options?: elements.style.IOptions<T>): elements.style.IElement<T> {
    return <elements.style.IElement<T>>factory().createStyleElement(options);
  }

  export function sub<T>(options?: elements.sub.IOptions<T>): elements.sub.IElement<T> {
    return <elements.sub.IElement<T>>factory().createSubElement(options);
  }

  export function sup<T>(options?: elements.sup.IOptions<T>): elements.sup.IElement<T> {
    return <elements.sup.IElement<T>>factory().createSupElement(options);
  }

  export function table<T>(options?: elements.table.IOptions<T>): elements.table.IElement<T> {
    return <elements.table.IElement<T>>factory().createTableElement(options);
  }

  export function tbody<T>(options?: elements.tbody.IOptions<T>): elements.tbody.IElement<T> {
    return <elements.tbody.IElement<T>>factory().createTbodyElement(options);
  }

  export function td<T>(options?: elements.td.IOptions<T>): elements.td.IElement<T> {
    return <elements.td.IElement<T>>factory().createTdElement(options);
  }

  export function textarea<T>(options?: elements.textarea.IOptions<T>): elements.textarea.IElement<T> {
    return <elements.textarea.IElement<T>>factory().createTextareaElement(options);
  }

  export function tfoot<T>(options?: elements.tfoot.IOptions<T>): elements.tfoot.IElement<T> {
    return <elements.tfoot.IElement<T>>factory().createTfootElement(options);
  }

  export function th<T>(options?: elements.th.IOptions<T>): elements.th.IElement<T> {
    return <elements.th.IElement<T>>factory().createThElement(options);
  }

  export function thead<T>(options?: elements.thead.IOptions<T>): elements.thead.IElement<T> {
    return <elements.thead.IElement<T>>factory().createTheadElement(options);
  }

  export function title<T>(options?: elements.title.IOptions<T>): elements.title.IElement<T> {
    return <elements.title.IElement<T>>factory().createTitleElement(options);
  }

  export function tr<T>(options?: elements.tr.IOptions<T>): elements.tr.IElement<T> {
    return <elements.tr.IElement<T>>factory().createTrElement(options);
  }

  export function tt<T>(options?: elements.tt.IOptions<T>): elements.tt.IElement<T> {
    return <elements.tt.IElement<T>>factory().createTtElement(options);
  }

  export function ul<T>(options?: elements.ul.IOptions<T>): elements.ul.IElement<T> {
    return <elements.ul.IElement<T>>factory().createUlElement(options);
  }

  export function variable<T>(options?: elements.variable.IOptions<T>): elements.variable.IElement<T> {
    return <elements.variable.IElement<T>>factory().createVariableElement(options);
  }

}