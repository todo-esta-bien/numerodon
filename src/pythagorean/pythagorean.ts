import {
  getLetterSumFromString,
  LetterSumResult,
  NumberReducer,
  reduceNumberDigits,
  ReduceNumberDigitsAttrs,
} from "../utils";

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
  public readonly lifePath: number;

  public readonly pythagoreanSumOptions: ReduceNumberDigitsAttrs = {
    sumRecursively: true,
    stopNumbers: [11, 22, 33, 44],
  };

  public readonly numberReducer: NumberReducer = reduceNumberDigits(this.pythagoreanSumOptions);

  constructor({ day, month, year, names, fatherLastNames, motherLastNames }: IPythagoreanProfileConstructor) {
    this.day = day;
    this.month = month;
    this.year = year;

    this.names = names;
    this.fatherLastNames = fatherLastNames;
    this.motherLastNames = motherLastNames;

    this.completeName = `${names} ${fatherLastNames} ${motherLastNames}`;
    this.completeNameSumResult = getLetterSumFromString(this.completeName, this.pythagoreanSumOptions);

    this.soul = this.completeNameSumResult.vowelSum;
    this.personality = this.completeNameSumResult.consonantSum;
    this.expression = this.completeNameSumResult.totalSum;

    // We're adding, and not concatenating, because in order to be a 33 you need to be super spiritual, and
    // there's a very low chance that it could be happening.
    // If for some reason we want to get back to the 33 calculations, uncomment this line:
    // this.cosmicMission = this.numberReducer(+`${this.completeNameSumResult.totalSum}${day}${month}${year}`);
    this.cosmicMission = this.numberReducer(this.completeNameSumResult.totalSum + day + month + year);

    this.balance = this.getCompleteNameInitialsSum(this.completeName);
    this.strength = this.numberReducer(day + month);
    this.lifePath = this.numberReducer(day + month + year);

    this.spiritualInitiation = this.numberReducer(this.soul + this.expression + day + this.lifePath);
  }

  private getCompleteNameInitialsSum(completeName: string): number {
    const concatenatedInitials: string = completeName
      .split(" ")
      .map((name: string) => name[0])
      .join("");
    const letterSumResult: LetterSumResult = getLetterSumFromString(concatenatedInitials, this.pythagoreanSumOptions);
    return letterSumResult.totalSum;
  }
}

export interface IPythagoreanPinnacleConstructor {
  day: number;
  month: number;
  year: number;
}

export class PythagoreanPinnacle {
  public readonly month: number;
  public readonly day: number;
  public readonly year: number;

  public readonly karma: number; // A
  public readonly personal: number; // B
  public readonly pastLife: number; // C
  public readonly personality: number; // D

  public readonly firstRealization: number; // E
  public readonly secondRealization: number; // F
  public readonly thirdRealization: number; // G
  public readonly fourthRealization: number; // H
  public readonly destiny: number; // H

  public readonly subconscious: number; // I
  public readonly unconscious: number; // J

  public readonly firstGoal: number; // K
  public readonly secondGoal: number; // L
  public readonly thirdGoal: number; // M
  public readonly fourthGoal: number; // N

  public readonly negativeUnconscious: number; // O
  public readonly shadow: number; // P

  public readonly familyInferiorBeing: number; // Q
  public readonly consciousInferiorBeing: number; // R
  public readonly latentInferiorBeing: number; // S

  public readonly absences: number[]; // T

  public readonly triplicities: number[]; // W

  private readonly pythagoreanPinnacleSumOptions: ReduceNumberDigitsAttrs = {
    sumRecursively: true,
    stopNumbers: [11, 22, 33, 44],
  };

  private readonly numberReducer: NumberReducer = reduceNumberDigits(this.pythagoreanPinnacleSumOptions);

  constructor({ day, month, year }: IPythagoreanPinnacleConstructor) {
    this.day = day;
    this.month = month;
    this.year = year;

    this.karma = this.numberReducer(month);
    this.personal = this.numberReducer(day);
    this.pastLife = this.numberReducer(year);
    this.personality = this.numberReducer(day + month + year);

    this.firstRealization = this.numberReducer(month + day);
    this.secondRealization = this.numberReducer(day + year);
    this.thirdRealization = this.numberReducer(month + 2 * day + year);
    this.fourthRealization = this.numberReducer(month + year);
    this.destiny = this.fourthRealization;

    this.subconscious = this.numberReducer(this.firstRealization + this.secondRealization + this.thirdRealization);
    this.unconscious = this.numberReducer(this.personality + this.fourthRealization);

    // Below numbers needs to use reduced versions (with no stop numbers) of day, month and year
    const reducedMonth = reduceNumberDigits({ sumRecursively: true })(month);
    const reducedDay = reduceNumberDigits({ sumRecursively: true })(day);
    const reducedYear = reduceNumberDigits({ sumRecursively: true })(year);

    this.firstGoal = this.numberReducer(Math.abs(reducedMonth - reducedDay));
    this.secondGoal = this.numberReducer(Math.abs(reducedDay - reducedYear));
    this.thirdGoal = this.numberReducer(Math.abs(this.firstGoal - this.secondGoal));
    this.fourthGoal = this.numberReducer(Math.abs(reducedMonth - reducedYear));

    this.negativeUnconscious = this.numberReducer(this.firstGoal + this.secondGoal + this.thirdGoal);
    this.shadow = this.numberReducer(this.personality + this.negativeUnconscious);

    this.familyInferiorBeing = this.numberReducer(this.firstGoal + this.thirdGoal);
    this.consciousInferiorBeing = this.numberReducer(this.secondGoal + this.thirdGoal);
    this.latentInferiorBeing = this.numberReducer(this.familyInferiorBeing + this.consciousInferiorBeing);

    this.absences = this.calculateAbsences([
      this.karma,
      this.personal,
      this.pastLife,
      this.personality,
      this.firstRealization,
      this.secondRealization,
      this.thirdRealization,
      this.fourthRealization,
      this.destiny,
      this.subconscious,
      this.unconscious,
      this.firstGoal,
      this.secondGoal,
      this.thirdGoal,
      this.fourthGoal,
      this.negativeUnconscious,
      this.shadow,
      this.familyInferiorBeing,
      this.consciousInferiorBeing,
      this.latentInferiorBeing,
    ]);

    this.triplicities = this.calculateTriplicities([
      this.firstGoal,
      this.secondGoal,
      this.thirdGoal,
      this.fourthGoal,
      this.negativeUnconscious,
      this.shadow,
      this.familyInferiorBeing,
      this.consciousInferiorBeing,
      this.latentInferiorBeing,
    ]);
  }

  private calculateAbsences(pinnacleNumbers: number[]): number[] {
    // This is the missing number from 1 to 9, that is not present in all of the pinnacle numbers
    const sortedPinnacleNumbers: Set<number> = new Set(pinnacleNumbers); // e.g. [2, 2, 2, 3, 4, 5, 6, 7, 8]
    const neededNumbers: number[] = Array.from({ length: 9 }, (_, idx: number) => idx + 1); // e.g. [1, 2, ... 8, 9]

    return neededNumbers.filter((neededNumber: number) => !sortedPinnacleNumbers.has(neededNumber)); // e.g. [1, 9]
  }

  private calculateTriplicities(negativeNumbers: number[]): number[] {
    // If we have more than 3 equal numbers in the negative numbers, we should add that repeated number 3 times,
    // and reduce it to one digit (except for 11 and 22)
    const sortedNegativeNumbers = [...negativeNumbers].sort();

    interface RepeatedNumbers {
      [key: number]: number;
    }

    const repeatedNumbers: RepeatedNumbers = sortedNegativeNumbers.reduce(
      (repeatedNumbers: RepeatedNumbers, currentNumber: number) => {
        const currentCount = repeatedNumbers[currentNumber] || 0;
        repeatedNumbers[currentNumber] = currentCount + 1;

        return repeatedNumbers;
      },
      {} as RepeatedNumbers
    );

    const bruteSuperHiddens = Object.entries(repeatedNumbers) // e.g. [['3', 1], ['12', 3], ['15', 4]]
      .filter(([, count]: [string, number]) => count >= 3) // e.g. [['12', 3], ['15', 4]]
      .map(([numberValue]: [string, number]) => +numberValue) // e.g. [12, 15]
      .map((numberValue: number) => this.numberReducer(3 * numberValue)); // e.g. [9, 9]

    return bruteSuperHiddens;
  }
}
