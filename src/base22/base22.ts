import { NumberReducer, reduceNumberDigits, ReduceNumberDigitsAttrs } from "../utils";

export interface IBase22ProfileConstructor {
  day: number;
  month: number;
  year: number;
}

export class Base22Profile {
  public readonly day: number;
  public readonly month: number;
  public readonly year: number;

  public readonly deepPersonality: number; // PP
  public readonly emotionalKnot: number; // NE
  public readonly emotionalSearch: number; // QE
  public readonly internalSocialBehavior: number; // CIS
  public readonly externalSocialBehavior: number; // CES
  public readonly externalSocialPersonality: number; // PES
  public readonly harmonySearch: number; // RH
  public readonly spiritualSearch: number; // QS
  public readonly resistanceNumber: number; // NR

  public readonly emerge: number; // RS
  public readonly painKnot: number; // ND
  public readonly internalDefenseBehavior: number; // CID
  public readonly externalDefenseBehavior: number; // CED
  public readonly externalDefensePersonality: number; // PED
  public readonly externalExitSearch: number; // RE
  public readonly escapeNumber: number; // NF

  public readonly firstSpiritualBaseA: number; // 1A
  public readonly firstSpiritualBaseB: number; // 1B
  public readonly firstSpiritualBaseC: number; // 1C

  public readonly secondSpiritualBaseA: number; // 2A
  public readonly secondSpiritualBaseB: number; // 2B
  public readonly secondSpiritualBaseC: number; // 2C

  public readonly thirdSpiritualBaseA: number; // 3A

  public readonly base22SumOptions: ReduceNumberDigitsAttrs = {
    sumRecursively: true,
    stopNumbers: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 26, 30, 33, 40],
  };

  public readonly numberReducer: NumberReducer = reduceNumberDigits(this.base22SumOptions);

  public readonly reducedDay: number;
  public readonly reducedMonth: number;
  public readonly reducedYear: number;

  constructor({ day, month, year }: IBase22ProfileConstructor) {
    this.day = day;
    this.month = month;
    this.year = year;

    this.reducedDay = this.numberReducer(this.day);
    this.reducedMonth = this.numberReducer(this.month);
    this.reducedYear = this.numberReducer(this.year);

    this.deepPersonality = this.numberReducer(this.reducedDay + this.reducedMonth + this.reducedYear); // PP
    this.emotionalKnot = this.numberReducer(this.reducedDay + this.reducedYear); // NE
    this.emotionalSearch = this.numberReducer(this.deepPersonality + this.emotionalKnot); // QE
    this.internalSocialBehavior = this.numberReducer(this.reducedDay + this.reducedMonth); // CIS
    this.externalSocialBehavior = this.numberReducer(this.reducedMonth + this.reducedYear); // CES
    this.externalSocialPersonality = this.numberReducer(this.internalSocialBehavior + this.externalSocialBehavior); // PES
    this.harmonySearch = this.numberReducer(this.deepPersonality + this.externalSocialPersonality); // RH
    this.spiritualSearch = this.numberReducer(this.reducedMonth + this.deepPersonality); // QS

    const resistanceNumber = this.numberReducer(
      Math.abs(Math.abs(this.reducedYear - this.reducedMonth) - this.reducedDay)
    ); // NR
    this.resistanceNumber = resistanceNumber === 0 ? 22 : resistanceNumber;

    this.emerge = this.numberReducer(this.resistanceNumber + this.externalSocialPersonality); // RS
    this.painKnot = this.numberReducer(Math.abs(this.reducedYear - this.reducedDay)); // ND
    this.internalDefenseBehavior = this.numberReducer(Math.abs(this.reducedDay - this.reducedMonth)); // CID
    this.externalDefenseBehavior = this.numberReducer(Math.abs(this.reducedYear - this.reducedMonth)); // CED
    this.externalDefensePersonality = this.numberReducer(
      Math.abs(this.internalDefenseBehavior - this.externalDefenseBehavior)
    ); // PED
    this.externalExitSearch = this.numberReducer(Math.abs(this.deepPersonality - this.externalDefensePersonality)); // RE
    this.escapeNumber = this.numberReducer(Math.abs(this.resistanceNumber - this.externalDefensePersonality)); // NF

    this.firstSpiritualBaseA = this.numberReducer(this.emerge + this.externalSocialPersonality); // 1A
    this.firstSpiritualBaseB = this.numberReducer(this.emerge + this.harmonySearch); // 1B
    this.firstSpiritualBaseC = this.numberReducer(this.externalSocialPersonality + this.harmonySearch); // 1C

    this.secondSpiritualBaseA = this.numberReducer(this.firstSpiritualBaseA + this.firstSpiritualBaseB); // 2A
    this.secondSpiritualBaseB = this.numberReducer(this.firstSpiritualBaseA + this.firstSpiritualBaseC); // 2B
    this.secondSpiritualBaseC = this.numberReducer(this.firstSpiritualBaseB + this.firstSpiritualBaseC); // 2C

    this.thirdSpiritualBaseA = this.numberReducer(this.secondSpiritualBaseA + this.secondSpiritualBaseC); // 3A
  }
}
