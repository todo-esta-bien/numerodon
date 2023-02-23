import {
  PythagoreanProfile,
  IPythagoreanProfileConstructor,
  PythagoreanPinnacle,
  IPythagoreanPinnacleConstructor,
} from "./pythagorean";

type PythagoreanProfileTestCase = {
  original: IPythagoreanProfileConstructor;
  expected: Omit<
    PythagoreanProfile,
    | "day"
    | "month"
    | "year"
    | "names"
    | "fatherLastNames"
    | "motherLastNames"
    | "pythagoreanSumOptions"
    | "getCompleteNameInitialsSum"
    | "completeName"
    | "completeNameSumResult"
  >;
};

const pythagoreanProfileTestCases: PythagoreanProfileTestCase[] = [
  {
    original: {
      day: 23,
      month: 11,
      year: 1992,
      names: "Miley",
      fatherLastNames: "Ray",
      motherLastNames: "Cyrus",
    },
    expected: {
      soul: 3,
      personality: 2,
      expression: 5,
      cosmicMission: 6,
      balance: 7,
      strength: 7,
      spiritualInitiation: 5,
      lifePath: 1,
    },
  },
];

describe("Testing PythagoreanProfile", () => {
  it.each(pythagoreanProfileTestCases)("PythagoreanProfile($original)", ({ original, expected }) => {
    // Act
    const profile: PythagoreanProfile = new PythagoreanProfile(original);

    // Assert
    expect(profile.soul).toBe(expected.soul);
    expect(profile.personality).toBe(expected.personality);
    expect(profile.expression).toBe(expected.expression);
    expect(profile.cosmicMission).toBe(expected.cosmicMission);
    expect(profile.balance).toBe(expected.balance);
    expect(profile.strength).toBe(expected.strength);
    expect(profile.spiritualInitiation).toBe(expected.spiritualInitiation);

    expect(profile.day).toBe(original.day);
    expect(profile.month).toBe(original.month);
    expect(profile.year).toBe(original.year);
    expect(profile.names).toBe(original.names);
    expect(profile.fatherLastNames).toBe(original.fatherLastNames);
    expect(profile.motherLastNames).toBe(original.motherLastNames);
  });

  it("Should sum initials", () => {
    // Arrange
    // a + d + q = 1 + 4 + 8 = 13 = 4
    const name = "Álvaro Díaz Quiroz";

    // Act
    const profile = new PythagoreanProfile({
      day: 0,
      month: 0,
      year: 0,
      names: "",
      fatherLastNames: "",
      motherLastNames: "",
    });

    const result = profile["getCompleteNameInitialsSum"](name);

    // Assert
    expect(result).toBe(4);
  });
});

type PythagoreanPinnacleTestCase = {
  original: IPythagoreanPinnacleConstructor;
  expected: Omit<PythagoreanPinnacle, "pythagoreanPinnacleSumOptions" | "day" | "month" | "year">;
};

const pythagoreanPinnacleTestCases: PythagoreanPinnacleTestCase[] = [
  {
    original: {
      day: 13,
      month: 3,
      year: 1963,
    },
    expected: {
      karma: 3, // A
      personal: 4, // B
      pastLife: 1, // C
      personality: 8, // D

      firstRealization: 7, // E
      secondRealization: 5, // F
      thirdRealization: 3, // G
      fourthRealization: 22, // H
      destiny: 22, // H

      subconscious: 6, // I
      unconscious: 3, // J

      firstGoal: 1, // K
      secondGoal: 3, // L
      thirdGoal: 2, // M
      fourthGoal: 2, // N

      negativeUnconscious: 6, // O
      shadow: 5, // P

      familyInferiorBeing: 3, // Q
      consciousInferiorBeing: 5, // R
      latentInferiorBeing: 8, // S

      superHiddens: [], // W
    },
  },
  {
    original: {
      day: 16,
      month: 8,
      year: 1980,
    },
    expected: {
      karma: 8, // A
      personal: 7, // B
      pastLife: 9, // C
      personality: 6, // D

      firstRealization: 6, // E
      secondRealization: 7, // F
      thirdRealization: 4, // G
      fourthRealization: 8, // H
      destiny: 8, // H

      subconscious: 8, // I
      unconscious: 5, // J

      firstGoal: 1, // K
      secondGoal: 2, // L
      thirdGoal: 1, // M
      fourthGoal: 1, // N

      negativeUnconscious: 4, // O
      shadow: 1, // P

      familyInferiorBeing: 2, // Q
      consciousInferiorBeing: 3, // R
      latentInferiorBeing: 5, // S

      superHiddens: [3], // W
    },
  },
  {
    original: {
      day: 27,
      month: 12,
      year: 1994,
    },
    expected: {
      karma: 3, // A
      personal: 9, // B
      pastLife: 5, // C
      personality: 8, // D

      firstRealization: 3, // E
      secondRealization: 5, // F
      thirdRealization: 8, // G
      fourthRealization: 8, // H
      destiny: 8, // H

      subconscious: 7, // I
      unconscious: 7, // J

      firstGoal: 6, // K
      secondGoal: 4, // L
      thirdGoal: 2, // M
      fourthGoal: 2, // N

      negativeUnconscious: 3, // O
      shadow: 11, // P

      familyInferiorBeing: 8, // Q
      consciousInferiorBeing: 6, // R
      latentInferiorBeing: 5, // S

      superHiddens: [], // W
    },
  },
  {
    original: {
      day: 24,
      month: 2,
      year: 1960,
    },
    expected: {
      karma: 2, // A
      personal: 6, // B
      pastLife: 7, // C
      personality: 6, // D

      firstRealization: 8, // E
      secondRealization: 22, // F
      thirdRealization: 3, // G
      fourthRealization: 9, // H
      destiny: 9, // H

      subconscious: 33, // I
      unconscious: 6, // J

      firstGoal: 4, // K
      secondGoal: 1, // L
      thirdGoal: 3, // M
      fourthGoal: 5, // N

      negativeUnconscious: 8, // O
      shadow: 5, // P

      familyInferiorBeing: 7, // Q
      consciousInferiorBeing: 4, // R
      latentInferiorBeing: 11, // S

      superHiddens: [], // W
    },
  },
  {
    original: {
      day: 5,
      month: 12,
      year: 1962,
    },
    expected: {
      karma: 3, // A
      personal: 5, // B
      pastLife: 9, // C
      personality: 8, // D

      firstRealization: 8, // E
      secondRealization: 5, // F
      thirdRealization: 22, // G
      fourthRealization: 3, // H
      destiny: 3, // H

      subconscious: 8, // I
      unconscious: 11, // J

      firstGoal: 2, // K
      secondGoal: 4, // L
      thirdGoal: 2, // M
      fourthGoal: 6, // N

      negativeUnconscious: 8, // O
      shadow: 7, // P

      familyInferiorBeing: 4, // Q
      consciousInferiorBeing: 6, // R
      latentInferiorBeing: 1, // S

      superHiddens: [], // W
    },
  },
  {
    original: {
      day: 6,
      month: 7,
      year: 1935,
    },
    expected: {
      karma: 7, // A
      personal: 6, // B
      pastLife: 9, // C
      personality: 22, // D

      firstRealization: 4, // E
      secondRealization: 6, // F
      thirdRealization: 1, // G
      fourthRealization: 7, // H
      destiny: 7, // H

      subconscious: 11, // I
      unconscious: 11, // J

      firstGoal: 1, // K
      secondGoal: 3, // L
      thirdGoal: 2, // M
      fourthGoal: 2, // N

      negativeUnconscious: 6, // O
      shadow: 1, // P

      familyInferiorBeing: 3, // Q
      consciousInferiorBeing: 5, // R
      latentInferiorBeing: 8, // S

      superHiddens: [], // W
    },
  },
  {
    original: {
      day: 7,
      month: 11,
      year: 1995,
    },
    expected: {
      karma: 11, // A
      personal: 7, // B
      pastLife: 6, // C
      personality: 6, // D

      firstRealization: 9, // E
      secondRealization: 4, // F
      thirdRealization: 4, // G
      fourthRealization: 8, // H
      destiny: 8, // H

      subconscious: 8, // I
      unconscious: 5, // J

      firstGoal: 5, // K
      secondGoal: 1, // L
      thirdGoal: 4, // M
      fourthGoal: 4, // N

      negativeUnconscious: 1, // O
      shadow: 7, // P

      familyInferiorBeing: 9, // Q
      consciousInferiorBeing: 5, // R
      latentInferiorBeing: 5, // S

      superHiddens: [6], // W
    },
  },
  {
    original: {
      day: 18,
      month: 12,
      year: 1878,
    },
    expected: {
      karma: 3, // A
      personal: 9, // B
      pastLife: 6, // C
      personality: 9, // D

      firstRealization: 3, // E
      secondRealization: 6, // F
      thirdRealization: 9, // G
      fourthRealization: 9, // H
      destiny: 9, // H

      subconscious: 9, // I
      unconscious: 9, // J

      firstGoal: 6, // K
      secondGoal: 3, // L
      thirdGoal: 3, // M
      fourthGoal: 3, // N

      negativeUnconscious: 3, // O
      shadow: 3, // P

      familyInferiorBeing: 9, // Q
      consciousInferiorBeing: 6, // R
      latentInferiorBeing: 6, // S

      superHiddens: [9, 9], // W
    },
  },
];

describe("Testing PythagoreanPinnacle", () => {
  it.each(pythagoreanPinnacleTestCases)("PythagoreanPinnacle($original)", ({ original, expected }) => {
    // Act
    const profile: PythagoreanPinnacle = new PythagoreanPinnacle(original);

    // Assert
    expect(profile.karma).toBe(expected.karma);
    expect(profile.personal).toBe(expected.personal);
    expect(profile.pastLife).toBe(expected.pastLife);
    expect(profile.personality).toBe(expected.personality);

    expect(profile.firstRealization).toBe(expected.firstRealization);
    expect(profile.secondRealization).toBe(expected.secondRealization);
    expect(profile.thirdRealization).toBe(expected.thirdRealization);
    expect(profile.fourthRealization).toBe(expected.fourthRealization);
    expect(profile.destiny).toBe(expected.destiny);

    expect(profile.subconscious).toBe(expected.subconscious);
    expect(profile.unconscious).toBe(expected.unconscious);

    expect(profile.firstGoal).toBe(expected.firstGoal);
    expect(profile.secondGoal).toBe(expected.secondGoal);
    expect(profile.thirdGoal).toBe(expected.thirdGoal);
    expect(profile.fourthGoal).toBe(expected.fourthGoal);

    expect(profile.negativeUnconscious).toBe(expected.negativeUnconscious);
    expect(profile.shadow).toBe(expected.shadow);

    expect(profile.familyInferiorBeing).toBe(expected.familyInferiorBeing);
    expect(profile.consciousInferiorBeing).toBe(expected.consciousInferiorBeing);
    expect(profile.latentInferiorBeing).toBe(expected.latentInferiorBeing);

    expect(profile.superHiddens).toMatchObject(expected.superHiddens);
  });

  it.each([
    [
      [3, 15, 3, 12, 15, 12, 4, 15, 5, 12, 2, 15],
      [9, 9],
    ],
    [[3, 15, 3, 12, 15, 12, 4, 15, 5], [9]],
    [[3, 15, 3, 12, 15, 12, 4, 5], []],
  ])("%s should generate %s super hiddens", (negativeNumbers: number[], expected: number[]) => {
    // Arrange
    const pinnacle = new PythagoreanPinnacle({ day: 0, month: 0, year: 0 });

    // Act
    const result = pinnacle["calculateSuperHidden"](negativeNumbers);

    // Assert
    expect(result).toMatchObject(expected);
  });
});
