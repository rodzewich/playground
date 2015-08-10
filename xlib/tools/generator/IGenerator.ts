module tools.generator {

  export interface IGenerator {

    addLine(line: string): IGenerator;

    getLines(): string[];

  }

}