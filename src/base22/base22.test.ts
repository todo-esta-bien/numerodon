import { Base22Profile, IBase22ProfileConstructor } from "./base22";

type Base22ProfileTestCase = {
  original: IBase22ProfileConstructor;
  expected: Omit<
    Base22Profile,
    "day" | "month" | "year" | "base22SumOptions" | "numberReducer" | "reducedDay" | "reducedMonth" | "reducedYear"
  >;
};

const base22TestCases: Base22ProfileTestCase[] = [
  {
    original: {
      day: 2,
      month: 10,
      year: 1869,
    },
    expected: {
      deepPersonality: 18, // PP
      emotionalKnot: 8, // NE
      emotionalSearch: 26, // QE
      internalSocialBehavior: 12, // CIS
      externalSocialBehavior: 16, // CES
      externalSocialPersonality: 10, // PES
      harmonySearch: 10, // RH
      spiritualSearch: 10, // QS
      resistanceNumber: 2, // NR

      emerge: 12, // RS
      painKnot: 4, // ND
      internalDefenseBehavior: 8, // CID
      externalDefenseBehavior: 4, // CED
      externalDefensePersonality: 4, // PED
      externalExitSearch: 14, // RE
      escapeNumber: 2, // NF

      firstSpiritualBaseA: 22, // 1A
      firstSpiritualBaseB: 22, // 1B
      firstSpiritualBaseC: 20, // 1C

      secondSpiritualBaseA: 44, // 2A
      secondSpiritualBaseB: 6, // 2B
      secondSpiritualBaseC: 6, // 2C

      thirdSpiritualBaseA: 14, // 3A
    },
  },
  {
    original: {
      day: 15,
      month: 7,
      year: 1970,
    },
    expected: {
      deepPersonality: 12, // PP
      emotionalKnot: 5, // NE
      emotionalSearch: 17, // QE
      internalSocialBehavior: 22, // CIS
      externalSocialBehavior: 6, // CES
      externalSocialPersonality: 10, // PES
      harmonySearch: 22, // RH
      spiritualSearch: 19, // QS
      resistanceNumber: 5, // NR

      emerge: 15, // RS
      painKnot: 2, // ND
      internalDefenseBehavior: 8, // CID
      externalDefenseBehavior: 10, // CED
      externalDefensePersonality: 2, // PED
      externalExitSearch: 10, // RE
      escapeNumber: 3, // NF

      firstSpiritualBaseA: 7, // 1A
      firstSpiritualBaseB: 10, // 1B
      firstSpiritualBaseC: 5, // 1C

      secondSpiritualBaseA: 17, // 2A
      secondSpiritualBaseB: 12, // 2B
      secondSpiritualBaseC: 15, // 2C

      thirdSpiritualBaseA: 5, // 3A
    },
  },
  {
    original: {
      day: 13,
      month: 11,
      year: 1953,
    },
    expected: {
      deepPersonality: 6, // PP
      emotionalKnot: 4, // NE
      emotionalSearch: 10, // QE
      internalSocialBehavior: 6, // CIS
      externalSocialBehavior: 11, // CES
      externalSocialPersonality: 17, // PES
      harmonySearch: 5, // RH
      spiritualSearch: 17, // QS
      resistanceNumber: 6, // NR

      emerge: 5, // RS
      painKnot: 5, // ND
      internalDefenseBehavior: 2, // CID
      externalDefenseBehavior: 7, // CED
      externalDefensePersonality: 5, // PED
      externalExitSearch: 1, // RE
      escapeNumber: 1, // NF

      firstSpiritualBaseA: 22, // 1A
      firstSpiritualBaseB: 10, // 1B
      firstSpiritualBaseC: 22, // 1C

      secondSpiritualBaseA: 5, // 2A
      secondSpiritualBaseB: 44, // 2B
      secondSpiritualBaseC: 5, // 2C

      thirdSpiritualBaseA: 10, // 3A
    },
  },
];

describe("Base22Profile", () => {
  it.each(base22TestCases)("Base22Profile($original)", ({ original, expected }) => {
    // Act
    const profile = new Base22Profile(original);

    // Assert
    expect(profile.deepPersonality).toEqual(expected.deepPersonality);
    expect(profile.emotionalKnot).toEqual(expected.emotionalKnot);
    expect(profile.emotionalSearch).toEqual(expected.emotionalSearch);
    expect(profile.internalSocialBehavior).toEqual(expected.internalSocialBehavior);
    expect(profile.externalSocialBehavior).toEqual(expected.externalSocialBehavior);
    expect(profile.externalSocialPersonality).toEqual(expected.externalSocialPersonality);
    expect(profile.harmonySearch).toEqual(expected.harmonySearch);
    expect(profile.spiritualSearch).toEqual(expected.spiritualSearch);
    expect(profile.resistanceNumber).toEqual(expected.resistanceNumber);

    expect(profile.emerge).toEqual(expected.emerge);
    expect(profile.painKnot).toEqual(expected.painKnot);
    expect(profile.internalDefenseBehavior).toEqual(expected.internalDefenseBehavior);
    expect(profile.externalDefenseBehavior).toEqual(expected.externalDefenseBehavior);
    expect(profile.externalDefensePersonality).toEqual(expected.externalDefensePersonality);
    expect(profile.externalExitSearch).toEqual(expected.externalExitSearch);
    expect(profile.escapeNumber).toEqual(expected.escapeNumber);

    expect(profile.firstSpiritualBaseA).toEqual(expected.firstSpiritualBaseA);
    expect(profile.firstSpiritualBaseB).toEqual(expected.firstSpiritualBaseB);
    expect(profile.firstSpiritualBaseC).toEqual(expected.firstSpiritualBaseC);

    expect(profile.secondSpiritualBaseA).toEqual(expected.secondSpiritualBaseA);
    expect(profile.secondSpiritualBaseB).toEqual(expected.secondSpiritualBaseB);
    expect(profile.secondSpiritualBaseC).toEqual(expected.secondSpiritualBaseC);

    expect(profile.thirdSpiritualBaseA).toEqual(expected.thirdSpiritualBaseA);
  });
});
