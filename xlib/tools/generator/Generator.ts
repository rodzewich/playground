/// <reference path="IGenerator.ts" />

module tools.generator {

  export class Generator implements IGenerator {

    private lines: string[] = [];

    addLine(value: any): IGenerator {
      if (!this.lines) {
        this.lines = [];
      }
      this.lines.push(value);
      return this;
    }

    getLines(): string[] {
      if (!this.lines) {
        this.lines = [];
      }
      return this.lines.slice(0);
    }

  }

}