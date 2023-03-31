import { EvolutiveProfile, IEvolutiveProfileConstructor, EvolutiveNumbers } from "./evolutive";

type EvolutiveProfileTestCase = {
  original: IEvolutiveProfileConstructor;
  expected: Omit<
    EvolutiveProfile,
    | "day"
    | "month"
    | "year"
    | "names"
    | "fatherLastNames"
    | "motherLastNames"
    | "completeName"
    | "evolutiveSumOptions"
    | "numberReducer"
  >;
};

const evolutiveProfileTestCases: EvolutiveProfileTestCase[] = [
  {
    original: {
      day: 27,
      month: 12,
      year: 1994,
      names: "Rodrigo",
      fatherLastNames: "Medina",
      motherLastNames: "Neri",
    },
    expected: {
      completeNameChars: 17,
      residents: [1, 0, 0, 3, 4, 2, 1, 0, 6],
      personalYears: [8, 9, 1, 11, 3, 4, 5, 6, 7],
    },
  },
  {
    original: {
      day: 7,
      month: 11,
      year: 1995,
      names: "Jhocelyn",
      fatherLastNames: "Cruz",
      motherLastNames: "Espinosa",
    },
    expected: {
      completeNameChars: 20,
      residents: [4, 0, 4, 0, 4, 2, 2, 2, 2],
      personalYears: [6, 7, 8, 9, 1, 11, 3, 4, 5],
    },
  },
  {
    original: {
      day: 13,
      month: 3,
      year: 1963,
      names: "Leticia Verónica",
      fatherLastNames: "Neri",
      motherLastNames: "Guzmán García",
    },
    expected: {
      completeNameChars: 31,
      residents: [5, 1, 5, 2, 6, 1, 2, 1, 8],
      personalYears: [8, 9, 1, 2, 3, 22, 5, 6, 7],
    },
  },
  {
    original: {
      day: 13,
      month: 3,
      year: 1963,
      names: "Leticia Verónica",
      fatherLastNames: "Neri",
      motherLastNames: "Guzmán",
    },
    expected: {
      completeNameChars: 25,
      residents: [3, 1, 4, 2, 6, 1, 1, 1, 6],
      personalYears: [8, 9, 1, 2, 3, 22, 5, 6, 7],
    },
  },
];

describe("Testing EvolutiveProfile", () => {
  it.each(evolutiveProfileTestCases)("EvolutiveProfile($original)", ({ original, expected }) => {
    // Act
    const profile: EvolutiveProfile = new EvolutiveProfile(original);

    // Assert
    expect(profile.completeNameChars).toEqual(expected.completeNameChars);
    expect(profile.residents).toEqual(expected.residents);
    expect(profile.personalYears).toEqual(expected.personalYears);
  });

  it.each([["rodrigomedinaneri", [1, 0, 0, 3, 4, 2, 1, 0, 6]]])(
    "%s should get residents %s",
    (cleanName, expectedResidents) => {
      // Arrange
      const profile: EvolutiveProfile = new EvolutiveProfile({
        day: 0,
        month: 0,
        year: 0,
        names: "",
        fatherLastNames: "",
        motherLastNames: "",
      });

      // Act
      const residents: EvolutiveNumbers = profile["getResidents"](cleanName);

      // Assert
      expect(residents).toEqual(expectedResidents);
    }
  );

  it.each([
    [
      [27, 12, 1994],
      [8, 9, 1, 11, 3, 4, 5, 6, 7],
    ],
  ])("%s should get residents %s", ([day, month, year], expectedPersonalYears) => {
    // Arrange
    const profile: EvolutiveProfile = new EvolutiveProfile({
      day: 0,
      month: 0,
      year: 0,
      names: "",
      fatherLastNames: "",
      motherLastNames: "",
    });

    // Act
    const residents: EvolutiveNumbers = profile["getPersonalYears"](day, month, year);

    // Assert
    expect(residents).toEqual(expectedPersonalYears);
  });
});
