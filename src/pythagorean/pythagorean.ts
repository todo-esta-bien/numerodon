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
  public readonly lifePath: number;

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

    this.completeName = `${names} ${fatherLastNames} ${motherLastNames}`;
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
    this.strength = reduceNumberDigits(day + month, this.pythagoreanSumOptions);
    this.lifePath = reduceNumberDigits(day + month + year, this.pythagoreanSumOptions);

    this.spiritualInitiation = reduceNumberDigits(
      this.soul + this.expression + day + this.lifePath,
      this.pythagoreanSumOptions
    );
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

  public readonly superHiddens: number[]; // W

  public readonly pythagoreanPinnacleSumOptions: ReduceNumberDigitsAttrs = {
    sumRecursively: true,
    stopNumbers: [11, 22, 33, 44],
  };

  constructor({ day, month, year }: IPythagoreanPinnacleConstructor) {
    this.day = day;
    this.month = month;
    this.year = year;

    this.karma = reduceNumberDigits(month, this.pythagoreanPinnacleSumOptions);
    this.personal = reduceNumberDigits(day, this.pythagoreanPinnacleSumOptions);
    this.pastLife = reduceNumberDigits(year, this.pythagoreanPinnacleSumOptions);
    this.personality = reduceNumberDigits(day + month + year, this.pythagoreanPinnacleSumOptions);

    this.firstRealization = reduceNumberDigits(month + day, this.pythagoreanPinnacleSumOptions);
    this.secondRealization = reduceNumberDigits(day + year, this.pythagoreanPinnacleSumOptions);
    this.thirdRealization = reduceNumberDigits(month + 2 * day + year, this.pythagoreanPinnacleSumOptions);
    this.fourthRealization = reduceNumberDigits(month + year, this.pythagoreanPinnacleSumOptions);
    this.destiny = this.fourthRealization;

    this.subconscious = reduceNumberDigits(
      this.firstRealization + this.secondRealization + this.thirdRealization,
      this.pythagoreanPinnacleSumOptions
    );
    this.unconscious = reduceNumberDigits(
      this.personality + this.fourthRealization,
      this.pythagoreanPinnacleSumOptions
    );

    // Below numbers needs to use reduced versions (with no stop numbers) of day, month and year
    const reducedMonth = reduceNumberDigits(month, { sumRecursively: true });
    const reducedDay = reduceNumberDigits(day, { sumRecursively: true });
    const reducedYear = reduceNumberDigits(year, { sumRecursively: true });

    this.firstGoal = reduceNumberDigits(Math.abs(reducedMonth - reducedDay), this.pythagoreanPinnacleSumOptions);
    this.secondGoal = reduceNumberDigits(Math.abs(reducedDay - reducedYear), this.pythagoreanPinnacleSumOptions);
    this.thirdGoal = reduceNumberDigits(Math.abs(this.firstGoal - this.secondGoal), this.pythagoreanPinnacleSumOptions);
    this.fourthGoal = reduceNumberDigits(Math.abs(reducedMonth - reducedYear), this.pythagoreanPinnacleSumOptions);

    this.negativeUnconscious = reduceNumberDigits(
      this.firstGoal + this.secondGoal + this.thirdGoal,
      this.pythagoreanPinnacleSumOptions
    );
    this.shadow = reduceNumberDigits(this.personality + this.negativeUnconscious, this.pythagoreanPinnacleSumOptions);

    this.familyInferiorBeing = reduceNumberDigits(this.firstGoal + this.thirdGoal, this.pythagoreanPinnacleSumOptions);
    this.consciousInferiorBeing = reduceNumberDigits(
      this.secondGoal + this.thirdGoal,
      this.pythagoreanPinnacleSumOptions
    );
    this.latentInferiorBeing = reduceNumberDigits(
      this.familyInferiorBeing + this.consciousInferiorBeing,
      this.pythagoreanPinnacleSumOptions
    );

    this.superHiddens = this.calculateSuperHidden([
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

  private calculateSuperHidden(negativeNumbers: number[]): number[] {
    const sortedNegativeNumbers = [...negativeNumbers].sort();

    interface RepeatedNumbers {
      [key: number]: number;
    }

    const repeatedNumbers: RepeatedNumbers = sortedNegativeNumbers.reduce(
      (repeatedNumbers: RepeatedNumbers, currentNumber: number) => {
        if (repeatedNumbers[currentNumber] === undefined) {
          // Set initial value
          repeatedNumbers[currentNumber] = 1;
        } else {
          // Increment number count
          repeatedNumbers[currentNumber] += 1;
        }

        return repeatedNumbers;
      },
      {} as RepeatedNumbers
    );

    const bruteSuperHiddens = Object.entries(repeatedNumbers) // e.g. [['3', 1], ['12', 3], ['15', 4]]
      .filter(([, count]: [string, number]) => count >= 3) // e.g. [['12', 3], ['15', 4]]
      .map(([numberValue]: [string, number]) => +numberValue) // e.g. [12, 15]
      .map((numberValue: number) => reduceNumberDigits(3 * numberValue, this.pythagoreanPinnacleSumOptions)); // e.g. [9, 9]

    return bruteSuperHiddens;
  }
}
