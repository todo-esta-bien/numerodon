import { PythagoreanProfile, IPythagoreanProfileConstructor } from "./pythagorean";

type TestCase = {
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

const profileTestCases: TestCase[] = [
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
  it.each(profileTestCases)("PythagoreanProfile($original)", ({ original, expected }) => {
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
