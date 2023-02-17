import { getLetterSumFromString, LetterSumResult, reduceNumberDigits, ReduceNumberDigitsAttrs } from "../utils";

export interface IPythagoreanProfileConstructor {
  day: number;
  month: number;
  year: number;
  names: string;
  fatherLastNames: string;
  motherLastNames: string;
}

export class PythagoreanProfile {
  public readonly day: number;
  public readonly month: number;
  public readonly year: number;

  public readonly names: string;
  public readonly fatherLastNames: string;
  public readonly motherLastNames: string;
  public readonly completeName: string;
  public readonly completeNameSumResult: LetterSumResult;

  public readonly soul: number;
  public readonly personality: number;
  public readonly expression: number;
  public readonly cosmicMission: number;
  public readonly balance: number;
  public readonly strength: number;
  public readonly spiritualInitiation: number;

  public readonly pythagoreanSumOptions: ReduceNumberDigitsAttrs = {
    sumRecursively: true,
    stopNumbers: [11, 22, 33, 44],
  };

  constructor({ day, month, year, names, fatherLastNames, motherLastNames }: IPythagoreanProfileConstructor) {
    this.day = day;
    this.month = month;
    this.year = year;

    this.names = names;
    this.fatherLastNames = fatherLastNames;
    this.motherLastNames = motherLastNames;

    this.completeName = `${this.names} ${this.fatherLastNames} ${this.motherLastNames}`;
    this.completeNameSumResult = getLetterSumFromString(this.completeName, this.pythagoreanSumOptions);

    this.soul = this.completeNameSumResult.vowelSum;
    this.personality = this.completeNameSumResult.consonantSum;
    this.expression = this.completeNameSumResult.totalSum;

    // We're adding, and not concatenating, because in order to be a 33 you need to be super spiritual, and
    // there's a very low chance that it could be happening.
    // If for some reason we want to get back to the 33 calculations, uncomment this line:
    // this.cosmicMission = reduceNumberDigits(+`${this.completeNameSumResult.totalSum}${day}${month}${year}`, this.pythagoreanSumOptions);
    this.cosmicMission = reduceNumberDigits(
      this.completeNameSumResult.totalSum + day + month + year,
      this.pythagoreanSumOptions
    );

    this.balance = this.getCompleteNameInitialsSum(this.completeName);
    this.strength = reduceNumberDigits(this.day + this.month, this.pythagoreanSumOptions);
    this.spiritualInitiation = reduceNumberDigits(
      this.soul +
        this.expression +
        this.day +
        reduceNumberDigits(this.day + this.month + this.year, this.pythagoreanSumOptions),
      this.pythagoreanSumOptions
    );
  }

  getCompleteNameInitialsSum(completeName: string): number {
    const concatenatedInitials: string = completeName
      .split(" ")
      .map((name: string) => name[0])
      .join("");
    const letterSumResult: LetterSumResult = getLetterSumFromString(concatenatedInitials, this.pythagoreanSumOptions);
    return letterSumResult.totalSum;
  }
}
