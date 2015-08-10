module xlib.utils.date {

  export const ISO_DATE = "";

  // todo: see https://github.com/jquery/jquery-ui/blob/master/ui/i18n/datepicker-ru.js
  var lang: any          = <any>{/*lang*/},
    dayNames: any        = lang.DAY_NAMES || {},
    dayNamesFull: any    = dayNames.FULL || {},
    dayNamesShort: any   = dayNames.SHORT || {},
    dayNamesMin: any     = dayNames.MIN || {},
    monthNames: any      = lang.MONTH_NAMES || {},
    monthNamesFull: any  = monthNames.FULL || {},
    monthNamesShort: any = monthNames.SHORT || {};

  export class Date {

    constructor() {
      var monthNames: any = lang.MONTH_NAMES.FULL,
        months: string[] = [
        <string>monthNames.JANUARY,
        <string>monthNames.JANUARY
      ];
    }

    public goToNextSecond(): void {}
    public goToPrevSecond(): void {}

    public goToNextMinute(): void {}
    public prevMinute(): void {}

    public goToNextHour(): void {}
    public prevHour(): void {}

    public toString(): string {
      return "[object xlib.utils.date.Date]";
    }

    public static isRTL(): boolean {
      return false;
    }

    public static getMondayFullName(): string {
      return <string>dayNamesFull.MONDAY;
    }

    public static getTuesdayFullName(): string {
      return <string>dayNamesFull.TUESDAY;
    }

  }

}