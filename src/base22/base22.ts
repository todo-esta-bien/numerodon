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
    // Si sale 26, 30, 33, 40, 44, se debe usar el numero reducido para las operaciones, pero se debe de mostrar el
    // mayor con una diagonal y el numero reducido
    stopNumbers: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 26, 30, 33, 40, 44],
  };

  public readonly numberReducer: NumberReducer = reduceNumberDigits(this.base22SumOptions);

  public readonly reducedDay: number;
  public readonly reducedMonth: number;
  public readonly reducedYear: number;

  constructor({ day, month, year }: IBase22ProfileConstructor) {
    this.day = day;
    this.month = month;
    this.year = year;

    const lastReducer = reduceNumberDigits({
      sumRecursively: false,
      stopNumbers: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
    });

    this.reducedDay = this.numberReducer(this.day);
    this.reducedMonth = this.numberReducer(this.month);
    this.reducedYear = this.numberReducer(this.year);

    this.deepPersonality = this.numberReducer(this.reducedDay + this.reducedMonth + this.reducedYear); // PP
    const reducedDeepPersonality = lastReducer(this.deepPersonality);

    this.emotionalKnot = this.numberReducer(this.reducedDay + this.reducedYear); // NE
    const reducedEmotionalKnot = lastReducer(this.emotionalKnot);

    this.emotionalSearch = this.numberReducer(reducedDeepPersonality + reducedEmotionalKnot); // QE

    this.internalSocialBehavior = this.numberReducer(this.reducedDay + this.reducedMonth); // CIS
    const reducedInternalSocialBehavior = lastReducer(this.internalSocialBehavior);

    this.externalSocialBehavior = this.numberReducer(this.reducedMonth + this.reducedYear); // CES
    const reducedExternalSocialBehavior = lastReducer(this.externalSocialBehavior);

    this.externalSocialPersonality = this.numberReducer(reducedInternalSocialBehavior + reducedExternalSocialBehavior); // PES
    const reducedExternalSocialPersonality = lastReducer(this.externalSocialPersonality);

    this.harmonySearch = this.numberReducer(reducedDeepPersonality + reducedExternalSocialPersonality); // RH
    const reducedHarmonySearch = lastReducer(this.harmonySearch);

    this.spiritualSearch = this.numberReducer(this.reducedMonth + reducedDeepPersonality); // QS

    const resistanceNumber = this.numberReducer(
      Math.abs(Math.abs(this.reducedYear - this.reducedMonth) - this.reducedDay)
    ); // NR
    this.resistanceNumber = resistanceNumber === 0 ? 22 : resistanceNumber;
    const reducedResistanceNumber = lastReducer(this.resistanceNumber);

    this.emerge = this.numberReducer(reducedResistanceNumber + reducedExternalSocialPersonality); // RS
    const reducedEmerge = lastReducer(this.emerge);

    this.painKnot = this.numberReducer(Math.abs(this.reducedYear - this.reducedDay)); // ND

    this.internalDefenseBehavior = this.numberReducer(Math.abs(this.reducedDay - this.reducedMonth)); // CID
    const reducedInternalDefenseBehavior = lastReducer(this.internalDefenseBehavior);

    this.externalDefenseBehavior = this.numberReducer(Math.abs(this.reducedYear - this.reducedMonth)); // CED
    const reducedExternalDefenseBehavior = lastReducer(this.externalDefenseBehavior);

    this.externalDefensePersonality = this.numberReducer(
      Math.abs(reducedInternalDefenseBehavior - reducedExternalDefenseBehavior)
    ); // PED
    const reducedExternalDefensePersonality = lastReducer(this.externalDefensePersonality);

    this.externalExitSearch = this.numberReducer(Math.abs(reducedDeepPersonality - reducedExternalDefensePersonality)); // RE

    this.escapeNumber = this.numberReducer(Math.abs(reducedResistanceNumber - reducedExternalDefensePersonality)); // NF

    this.firstSpiritualBaseA = this.numberReducer(reducedEmerge + reducedExternalSocialPersonality); // 1A
    const reducedFirstSpiritualBaseA = lastReducer(this.firstSpiritualBaseA);

    this.firstSpiritualBaseB = this.numberReducer(reducedEmerge + reducedHarmonySearch); // 1B
    const reducedFirstSpiritualBaseB = lastReducer(this.firstSpiritualBaseB);

    this.firstSpiritualBaseC = this.numberReducer(reducedExternalSocialPersonality + reducedHarmonySearch); // 1C
    const reducedFirstSpiritualBaseC = lastReducer(this.firstSpiritualBaseC);

    this.secondSpiritualBaseA = this.numberReducer(reducedFirstSpiritualBaseA + reducedFirstSpiritualBaseB); // 2A
    const reducedSecondSpiritualBaseA = lastReducer(this.secondSpiritualBaseA);

    this.secondSpiritualBaseB = this.numberReducer(reducedFirstSpiritualBaseA + reducedFirstSpiritualBaseC); // 2B

    this.secondSpiritualBaseC = this.numberReducer(reducedFirstSpiritualBaseB + reducedFirstSpiritualBaseC); // 2C
    const reducedSecondSpiritualBaseC = lastReducer(this.secondSpiritualBaseC);

    this.thirdSpiritualBaseA = this.numberReducer(reducedSecondSpiritualBaseA + reducedSecondSpiritualBaseC); // 3A
  }
}
