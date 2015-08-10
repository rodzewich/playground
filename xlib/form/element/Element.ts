/// <reference path="IElement.ts" />
/// <reference path="IDecorator.ts" />

module form.element {

  export class Element<C, V> implements IElement<C, V> {

    private name: string = null;

    private id: string = null;

    private required: boolean = false;

    private readonly: boolean = false;

    private disabled: boolean = false;

    private decorator: IDecorator<C, V> = null;

    private value: V = null;

    public getName(): string {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        this.name = decorator.getName();
      }
      return this.name || null;
    }

    public setName(value: string): void {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        decorator.setName(value);
      }
      this.name = String(value || '') || null;
    }

    public getId(): string {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        this.id = decorator.getId();
      }
      return this.id || null;
    }

    public setId(value: string): void {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        decorator.setId(value);
      }
      this.id = String(value || '') || null;
    }

    public isDisabled(): boolean {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        this.disabled = decorator.isDisabled();
      }
      return !!this.disabled;
    }

    public setDisabled(value: boolean): void {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        decorator.setDisabled(value);
      }
      this.disabled = !!value;
    }

    public isRequired(): boolean {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        this.required = decorator.isRequired();
      }
      return !!this.required;
    }

    public setRequired(value: boolean): void {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        decorator.setRequired(value);
      }
      this.required = !!value;
    }

    public isReadonly(): boolean {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        this.readonly = decorator.isReadonly();
      }
      return !!this.readonly;
    }

    public setReadonly(value: boolean): void {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        decorator.setReadonly(value);
      }
      this.readonly = !!value;
    }

    public getValue(): V {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        this.value = decorator.getValue();
      }
      return this.value;
    }

    public setValue(value: V): void {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        decorator.setValue(value);
      }
      this.value = value;
    }

    public setDecorator(value: IDecorator<C, V>): void {
      if (value) {
        this.decorator = value;
        value.setId(this.getId());
        value.setName(this.getName());
        value.setDisabled(this.isDisabled());
        value.setReadonly(this.isReadonly());
        value.setRequired(this.isReadonly());
      } else {
        this.setId(value.getId());
        this.setName(value.getName());
        this.setDisabled(value.isDisabled());
        this.setReadonly(value.isReadonly());
        this.setRequired(value.isRequired());
        this.decorator = null;
      }
    }

    public getDecorator(): IDecorator<C, V> {
      return this.decorator || null;
    }

    public getContent(): C {
      var decorator: IDecorator<C, V> = this.getDecorator();
      if (decorator) {
        return decorator.getContent();
      }
      return null;
    }

  }

}