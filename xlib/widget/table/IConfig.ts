/// <reference path="IColumn.ts" />

module widget.table {

  export interface IConfig {
    primary?: string[];
    useSequence?: boolean;
    useTitle?: boolean;
    useRemove?: boolean;
    useUpdate?: boolean;
    useSelect?: boolean;
    useInsert?: boolean;
    useCopy?: boolean;
    useEdit?: boolean;
    columns?: IColumn[];
  }


}
