import { getLetterValue, NumberReducer, reduceNumberDigits, cleanString, ReduceNumberDigitsAttrs } from "../utils";

export interface IEvolutiveProfileConstructor {
  day: number;
  month: number;
  year: number;
  names: string;
  fatherLastNames: string;
  motherLastNames: string;
}

export type EvolutiveNumbers = [number, number, number, number, number, number, number, number, number];

export class EvolutiveProfile {
  public readonly day: number;
  public readonly month: number;
  public readonly year: number;

  public readonly names: string;
  public readonly fatherLastNames: string;
  public readonly motherLastNames: string;
  public readonly completeName: string;
  public readonly completeNameChars: number;
  public readonly residents: EvolutiveNumbers;
  public readonly personalYears: EvolutiveNumbers;

  public readonly evolutiveSumOptions: ReduceNumberDigitsAttrs = {
    sumRecursively: true,
    stopNumbers: [11, 22],
  };

  public readonly numberReducer: NumberReducer = reduceNumberDigits(this.evolutiveSumOptions);

  constructor({ day, month, year, names, fatherLastNames, motherLastNames }: IEvolutiveProfileConstructor) {
    this.day = day;
    this.month = month;
    this.year = year;

    this.names = names;
    this.fatherLastNames = fatherLastNames;
    this.motherLastNames = motherLastNames;

    this.completeName = `${names} ${fatherLastNames} ${motherLastNames}`;

    const cleanCompleteNameWithoutSpaces = cleanString(this.completeName.replace(/\s/g, ""));
    this.completeNameChars = cleanCompleteNameWithoutSpaces.length;

    this.residents = this.getResidents(cleanCompleteNameWithoutSpaces);
    this.personalYears = this.getPersonalYears(day, month, year);
  }

  /**
   * Generates the residents (repeated times of a letter value) starting from the 1 to the 9
   *
   * @param {string} cleanCompleteNameWithoutSpaces - The complete name without spaces or accents
   * @returns {EvolutiveNumbers} The 9 length array from values from 1 to 9 of the repeated values
   */
  private getResidents(cleanCompleteNameWithoutSpaces: string): EvolutiveNumbers {
    return cleanCompleteNameWithoutSpaces.split("").reduce((acc, letter) => {
      const letterValue: number = getLetterValue(letter);
      acc[letterValue - 1] += 1;
      return acc;
    }, new Array(9).fill(0) as EvolutiveNumbers);
  }

  /**
   * Generates the personal years, but considering the "master numbers". This starts based on the birthYear,
   * and should be matched manually with the residents.
   *
   * @param {number} day - The day of birth of the user
   * @param {number} month - The month of birth of the user
   * @param {number} year - The year of birth of the user
   * @returns {EvolutiveNumbers} The 9 length array from values from 1 to 9 (may include 11 or 22),
   *    starting with the personal year of the user
   */
  private getPersonalYears(day: number, month: number, year: number): EvolutiveNumbers {
    return new Array(9).fill(0).map((_, idx) => {
      return this.numberReducer(day + month + year + idx);
    }) as EvolutiveNumbers;
  }
}
