module widget.alert {

  export interface IOptions {
    title: string;
    text: string;
    closable?: boolean;
    handler?: () => void;
  }

}