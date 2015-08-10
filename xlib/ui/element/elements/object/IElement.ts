/// <reference path="../IElement.ts" />

module xlib.ui.element.elements.object {

  import IEvent = elements.IEvent;

  export interface IElement<T> extends elements.IElement<T> {
    getTitle(): string;
    setTitle(value: any): void;
    getLang(): string;
    setLang(value: any): void;
    getXmlLang(): string;
    setXmlLang(value: any): void;
    getDir(): string;
    setDir(value: any): void;
    getAlign(): string;
    setAlign(value: any): void;
    getClassId(): string;
    setClassId(value: any): void;
    getCode(): string;
    setCode(value: any): void;
    getCodeBase(): string;
    setCodeBase(value: any): void;
    getHSpace(): string;
    setHSpace(value: any): void;
    getVSpace(): string;
    setVSpace(value: any): void;
    getDeclare(): string;
    setDeclare(value: any): void;
    getClassCodeBase(): string;
    setClassCodeBase(value: any): void;
    getData(): string;
    setData(value: any): void;
    getType(): string;
    setType(value: any): void;
    getCodeType(): string;
    setCodeType(value: any): void;
    getArchive(): string;
    setArchive(value: any): void;
    getStandby(): string;
    setStandby(value: any): void;
    getHeight(): string;
    setHeight(value: any): void;
    getWidth(): string;
    setWidth(value: any): void;
    getUseMap(): string;
    setUseMap(value: any): void;
    getName(): string;
    setName(value: any): void;
    getTabIndex(): string;
    setTabIndex(value: any): void;
    onClick(listener: (event?: IEvent<T>) => void): void;
    onDblClick(listener: (event?: IEvent<T>) => void): void;
    onMouseDown(listener: (event?: IEvent<T>) => void): void;
    onMouseUp(listener: (event?: IEvent<T>) => void): void;
    onMouseOver(listener: (event?: IEvent<T>) => void): void;
    onMouseMove(listener: (event?: IEvent<T>) => void): void;
    onMouseOut(listener: (event?: IEvent<T>) => void): void;
    onKeyPress(listener: (event?: IEvent<T>) => void): void;
    onKeyDown(listener: (event?: IEvent<T>) => void): void;
    onKeyUp(listener: (event?: IEvent<T>) => void): void;
  }

}