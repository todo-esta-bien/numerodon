import { reduceNumberDigits } from "src/utils/utils";

interface ITantricProfileConstructor {
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

  public readonly tantricSumOptions = {
    sumRecursively: true,
    stopNumbers: [10, 11, 22, 33, 44],
  };

  constructor({ day, month, year }: ITantricProfileConstructor) {
    this.day = day;
    this.month = month;
    this.year = year;
    this.soul = reduceNumberDigits(day, this.tantricSumOptions);
    this.karma = reduceNumberDigits(month, this.tantricSumOptions);
    this.divineGift = reduceNumberDigits(year % 100, this.tantricSumOptions); // Only last two digits from year
    this.lastLife = reduceNumberDigits(year, this.tantricSumOptions);
    // We're adding, and not concatenating, because in order to be a 33 you need to be super spiritual, and
    // there's a very low chance that it could be happening.
    // If for some reason we want to get back to the 33 calculations, uncomment this line:
    // this.path = reduceNumberDigits(+`${day}${month}${year}`, this.tantricSumOptions);
    this.path = reduceNumberDigits(day + month + year, this.tantricSumOptions);
  }
}
