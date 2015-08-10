module tools.generator.enums.entity {

  export interface IEntity {
    getTitle(): string;
    setTitle(value: any): IEntity;
    getDesc(): string;
    setDesc(value: any): IEntity;
    getName(): string;
    setName(value: any): IEntity;
    getValue(): number;
    setValue(value: any): IEntity;
    getLines(): string[];
    toString(): string;
  }

}