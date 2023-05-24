import {
  NumberReducer,
  reduceNumberDigits,
  ReduceNumberDigitsAttrs,
  generateExpandedNames,
  getLetterValue,
} from "../utils";

import { PythagoreanPinnacle } from "./pythagorean";

export interface IDestinyTableConstructor {
  day: number;
  month: number;
  year: number;
  names: string;
  fatherLastNames: string;
  motherLastNames: string;
  yearExpansionLimit?: number;
}

export class DestinyTable {
  public readonly day: number;
  public readonly month: number;
  public readonly year: number;

  public readonly names: string;
  public readonly fatherLastNames: string;
  public readonly motherLastNames: string;

  public readonly expandedYears: number[];
  public readonly expandedAge: number[];

  public readonly expandedMentalPlane: string[];
  public readonly expandedMentalPlaneLetterValues: number[];

  public readonly expandedPhysicalPlane: string[];
  public readonly expandedPhysicalPlaneLetterValues: number[];

  public readonly expandedEmotionalPlane: string[];
  public readonly expandedEmotionalPlaneLetterValues: number[];

  // public readonly expandedSpiritualPlane: string[];
  // public readonly expandedSpiritualPlaneLetterValues: number[];

  public readonly expandedPersonalYears: number[];
  public readonly expandedRealizationNumbers: string[];

  public readonly destinyTableSumOptions: ReduceNumberDigitsAttrs = {
    sumRecursively: true,
    stopNumbers: [11, 22],
  };

  public readonly numberReducer: NumberReducer = reduceNumberDigits(this.destinyTableSumOptions);

  // Last row of the destiny table
  public readonly yearExpansionLimit: number;
  private readonly DEFAULT_YEAR_EXPANSION_LIMIT = 102;

  constructor({
    day,
    month,
    year,
    names,
    fatherLastNames,
    motherLastNames,
    yearExpansionLimit,
  }: IDestinyTableConstructor) {
    this.yearExpansionLimit = yearExpansionLimit || this.DEFAULT_YEAR_EXPANSION_LIMIT;

    this.day = day;
    this.month = month;
    this.year = year;

    this.names = names;
    this.fatherLastNames = fatherLastNames;
    this.motherLastNames = motherLastNames;

    this.expandedYears = Array.from({ length: this.yearExpansionLimit }, (_, i) => i + this.year);
    this.expandedAge = Array.from({ length: this.yearExpansionLimit }, (_, i) => i);

    this.expandedMentalPlane = generateExpandedNames(this.names, this.yearExpansionLimit);
    this.expandedMentalPlaneLetterValues = this.expandedMentalPlane.map((letter) => getLetterValue(letter));

    this.expandedPhysicalPlane = generateExpandedNames(this.fatherLastNames, this.yearExpansionLimit);
    this.expandedPhysicalPlaneLetterValues = this.expandedPhysicalPlane.map((letter) => getLetterValue(letter));

    this.expandedEmotionalPlane = generateExpandedNames(this.motherLastNames, this.yearExpansionLimit);
    this.expandedEmotionalPlaneLetterValues = this.expandedEmotionalPlane.map((letter) => getLetterValue(letter));

    this.expandedPersonalYears = this.expandedYears.map((year) => this.numberReducer(year + this.month + this.day));

    const pinnacle = new PythagoreanPinnacle({ day, month, year });
    this.expandedRealizationNumbers = this.generateExpandedRealizationNumbers(pinnacle);
  }

  private generateExpandedRealizationNumbers(pinnacle: PythagoreanPinnacle): string[] {
    const result: string[] = [];

    // Values which will fill the realization list for the destiny table
    const fillers = [
      `${pinnacle.firstRealization}`,
      `${pinnacle.secondRealization}`,
      `${pinnacle.thirdRealization}`,
      `${pinnacle.fourthRealization}`,
      `${pinnacle.fourthRealization}|${pinnacle.thirdRealization}`,
      `${pinnacle.fourthRealization}|${pinnacle.secondRealization}`,
      `${pinnacle.fourthRealization}|${pinnacle.firstRealization}`,
      `${pinnacle.fourthRealization}|${pinnacle.secondRealization}`,
      `${pinnacle.fourthRealization}|${pinnacle.thirdRealization}`,
      `${pinnacle.fourthRealization}|${pinnacle.fourthRealization}`,
    ];

    // numerology 🤷
    const NEXT_STAGE_INCREMENT = 9;

    let fillerIdx = 0;
    let nextChangeIdx = pinnacle.firstLifeStage;

    for (let i = 0; i < this.yearExpansionLimit; i++) {
      if (i === nextChangeIdx) {
        nextChangeIdx += NEXT_STAGE_INCREMENT;
        fillerIdx += fillerIdx + 1 < fillers.length ? 1 : 0;
      }

      result.push(fillers[fillerIdx]);
    }

    return result;
  }
}
