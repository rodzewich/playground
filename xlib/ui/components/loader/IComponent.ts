/// <reference path="../IComponent.ts" />

module xlib.ui.components.loader {

    export interface IComponent<T> extends components.IComponent<T> {
        onShown(callback: () => {}): void;
        onHidden(callback: () => {}): void;
        show(text?: string): void;
        hide(): void;
    }

}
