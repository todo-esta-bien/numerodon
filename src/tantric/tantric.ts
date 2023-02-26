import { NumberReducer, reduceNumberDigits, ReduceNumberDigitsAttrs } from "../utils";

export interface ITantricProfileConstructor {
  day: number;
  month: number;
  year: number;
}

export class TantricProfile {
  public readonly day: number;
  public readonly month: number;
  public readonly year: number;

  public readonly soul: number;
  public readonly karma: number;
  public readonly divineGift: number;
  public readonly lastLife: number;
  public readonly path: number;

  private readonly tantricSumOptions: ReduceNumberDigitsAttrs = {
    sumRecursively: true,
    stopNumbers: [10, 11, 22, 33, 44],
  };

  private readonly numberReducer: NumberReducer = reduceNumberDigits(this.tantricSumOptions);

  constructor({ day, month, year }: ITantricProfileConstructor) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.soul = this.numberReducer(day);
    this.karma = this.numberReducer(month);
    this.divineGift = this.numberReducer(year % 100); // Only last two digits from year
    this.lastLife = this.numberReducer(year);
    // We're adding, and not concatenating, because in order to be a 33 you need to be super spiritual, and
    // there's a very low chance that it could be happening.
    // If for some reason we want to get back to the 33 calculations, uncomment this line:
    // this.path = this.numberReducer(+`${day}${month}${year}`);
    this.path = this.numberReducer(day + month + year);
  }
}
