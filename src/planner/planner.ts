import { getDaysInMonth, NumberReducer, reduceNumberDigits, ReduceNumberDigitsAttrs } from "../utils";

export interface IPlannerProfileConstructor {
  // birthday day
  day: number;

  // birthday month: 1-based
  month: number;

  // birthday year
  year: number;

  // year and month to consult
  consultingYear: number;
  consultingMonth: number;
}

type PlannerDay = {
  calendarDay: number;
  personalDay: number;
  universalDay: number;
};

export class PlannerProfile {
  public readonly consultingYear: number;
  public readonly consultingMonth: number;
  public readonly day: number;
  // month is 1-based
  public readonly month: number;
  public readonly year: number;

  public readonly annualVibration: number; // VA
  public readonly universalVibration: number; // U
  public readonly personalVibration: number; // P

  // Each one of the 35 cells in a 7 (days) x 5 (weeks) calendar grid, starting on Sunday.
  public readonly plannerDays: (PlannerDay | null)[];

  public readonly plannerSumOptions: ReduceNumberDigitsAttrs = {
    sumRecursively: true,
    stopNumbers: [11, 22, 33],
  };

  public readonly numberReducer: NumberReducer = reduceNumberDigits(this.plannerSumOptions);

  constructor({ day, month, year, consultingYear, consultingMonth }: IPlannerProfileConstructor) {
    this.consultingYear = consultingYear;
    this.consultingMonth = consultingMonth;
    this.day = day;
    this.month = month;
    this.year = year;

    const reducedConsultingYear = this.numberReducer(this.consultingYear);

    this.annualVibration = this.numberReducer(this.day + this.month + this.consultingYear); // VA

    this.universalVibration = this.numberReducer(reducedConsultingYear + this.consultingMonth); // U

    this.personalVibration = this.numberReducer(this.annualVibration + this.consultingMonth); // P

    const firstDayDate = new Date(this.consultingYear, this.consultingMonth - 1, 1);
    const firstWeekDay = firstDayDate.getDay(); // 0 Sunday, 6 Saturday

    const gridStartOffset = new Array(firstWeekDay).fill(null);
    const plannerCalculatedDays: PlannerDay[] = getDaysInMonth(this.consultingYear, this.consultingMonth - 1).map(
      (calendarDay: number) => {
        const universalDay = this.numberReducer(this.universalVibration + calendarDay);
        const personalDay = this.numberReducer(this.personalVibration + calendarDay);
        return {
          calendarDay,
          universalDay,
          personalDay,
        };
      }
    );
    const gridEndOffset = new Array(Math.max(35 - (firstWeekDay + plannerCalculatedDays.length), 0)).fill(null);

    this.plannerDays = [...gridStartOffset, ...plannerCalculatedDays, ...gridEndOffset];
  }
}
