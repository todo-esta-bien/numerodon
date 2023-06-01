import { DestinyTable, IDestinyTableConstructor } from "./destinyTable";
import { PythagoreanPinnacle } from "./pythagorean";

type DestinyTableTestCase = {
  original: IDestinyTableConstructor;
  expected: Omit<
    DestinyTable,
    | "day"
    | "month"
    | "year"
    | "names"
    | "fatherLastNames"
    | "motherLastNames"
    | "destinyTableSumOptions"
    | "numberReducer"
  >;
};

const destinyTableTestCase: DestinyTableTestCase[] = [
  {
    original: {
      day: 7,
      month: 11,
      year: 1995,
      names: "Jhocelyn",
      fatherLastNames: "Cruz",
      motherLastNames: "Espinosa",
      yearExpansionLimit: 10,
    },
    expected: {
      yearExpansionLimit: 10,
      expandedYears: [1995, 1996, 1997, 1998, 1999, 2000, 2001, 2002, 2003, 2004],
      expandedAge: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      expandedMentalPlane: "jhhhhhhhho".split(""),
      expandedMentalPlaneLetterValues: [1, 8, 8, 8, 8, 8, 8, 8, 8, 6],
      expandedMentalPlaneLetterCount: [1, 1, 2, 3, 4, 5, 6, 7, 8, 1],
      expandedPhysicalPlane: "cccrrrrrrr".split(""),
      expandedPhysicalPlaneLetterValues: [3, 3, 3, 9, 9, 9, 9, 9, 9, 9],
      expandedPhysicalPlaneLetterCount: [1, 2, 3, 1, 2, 3, 4, 5, 6, 7],
      expandedEmotionalPlane: "eeeeespppp".split(""),
      expandedEmotionalPlaneLetterValues: [5, 5, 5, 5, 5, 1, 7, 7, 7, 7],
      expandedEmotionalPlaneLetterCount: [1, 2, 3, 4, 5, 1, 1, 2, 3, 4],
      expandedPersonalYears: [6, 7, 8, 9, 1, 11, 3, 4, 5, 6],
      expandedRealizationNumbers: "9999999999".split(""),
      expandedSpiritualPlane: [9, 16, 16, 22, 22, 9, 6, 6, 6, 22],
      expandedDestinyNumber: [6, 5, 6, 4, 5, 11, 9, 1, 11, 1],
      expandedCrisisPeriods: [10],
    },
  },
];

describe("Testing DestinyTable", () => {
  it.each(destinyTableTestCase)("DestinyTable($original)", ({ original, expected }) => {
    // Act
    const destinyTable = new DestinyTable(original);

    // Assert
    expect(destinyTable.yearExpansionLimit).toEqual(expected.yearExpansionLimit);
    expect(destinyTable.expandedYears).toMatchObject(expected.expandedYears);
    expect(destinyTable.expandedAge).toMatchObject(expected.expandedAge);
    expect(destinyTable.expandedMentalPlane).toMatchObject(expected.expandedMentalPlane);
    expect(destinyTable.expandedMentalPlaneLetterValues).toMatchObject(expected.expandedMentalPlaneLetterValues);
    expect(destinyTable.expandedMentalPlaneLetterCount).toMatchObject(expected.expandedMentalPlaneLetterCount);
    expect(destinyTable.expandedPhysicalPlane).toMatchObject(expected.expandedPhysicalPlane);
    expect(destinyTable.expandedPhysicalPlaneLetterValues).toMatchObject(expected.expandedPhysicalPlaneLetterValues);
    expect(destinyTable.expandedPhysicalPlaneLetterCount).toMatchObject(expected.expandedPhysicalPlaneLetterCount);
    expect(destinyTable.expandedEmotionalPlane).toMatchObject(expected.expandedEmotionalPlane);
    expect(destinyTable.expandedEmotionalPlaneLetterValues).toMatchObject(expected.expandedEmotionalPlaneLetterValues);
    expect(destinyTable.expandedEmotionalPlaneLetterCount).toMatchObject(expected.expandedEmotionalPlaneLetterCount);
    expect(destinyTable.expandedPersonalYears).toMatchObject(expected.expandedPersonalYears);
    expect(destinyTable.expandedRealizationNumbers).toMatchObject(expected.expandedRealizationNumbers);
    expect(destinyTable.expandedSpiritualPlane).toMatchObject(expected.expandedSpiritualPlane);
    expect(destinyTable.expandedDestinyNumber).toMatchObject(expected.expandedDestinyNumber);
    expect(destinyTable.expandedCrisisPeriods).toMatchObject(expected.expandedCrisisPeriods);
  });

  it.each([
    {
      pinnacle: new PythagoreanPinnacle({ day: 7, month: 11, year: 1995 }),
      expectedRealizationNumbers: [
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "9",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "4",
        "8",
        "8",
        "8",
        "8",
        "8",
        "8",
        "8",
        "8",
        "8",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|9",
        "8|9",
        "8|9",
        "8|9",
        "8|9",
        "8|9",
        "8|9",
        "8|9",
        "8|9",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|4",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
        "8|8",
      ],
    },
  ])("Generate expanded realization numbers", ({ pinnacle, expectedRealizationNumbers }) => {
    // Arrange
    const destinyTable = new DestinyTable({
      day: 7,
      month: 11,
      year: 1995,
      names: "Jhocelyn",
      fatherLastNames: "Cruz",
      motherLastNames: "Espinosa",
      yearExpansionLimit: 122,
    });

    // Act
    const result: string[] = destinyTable["generateExpandedRealizationNumbers"](pinnacle);

    // Assert
    expect(result).toMatchObject(expectedRealizationNumbers);
  });

  it.each([
    {
      nameLettersAmount: 25,
      yearExpansionLimit: 99,
      expected: [13, 25, 38, 50, 63, 75, 88],
    },
    {
      nameLettersAmount: 25,
      yearExpansionLimit: 95,
      expected: [13, 25, 38, 50, 63, 75, 88],
    },
    {
      nameLettersAmount: 25,
      yearExpansionLimit: 100,
      expected: [13, 25, 38, 50, 63, 75, 88, 100],
    },
    {
      nameLettersAmount: 20,
      yearExpansionLimit: 99,
      expected: [10, 20, 30, 40, 50, 60, 70, 80, 90],
    },
  ])(
    "generateCrisisPeriods($nameLettersAmount, $yearExpansionLimit) == $expected",
    ({ nameLettersAmount, yearExpansionLimit, expected }) => {
      // Arrange
      const destinyTable = new DestinyTable({
        day: 7,
        month: 11,
        year: 1995,
        names: "Jhocelyn",
        fatherLastNames: "Cruz",
        motherLastNames: "Espinosa",
        yearExpansionLimit: 99,
      });

      // Act
      const result = destinyTable["generateCrisisPeriods"](nameLettersAmount, yearExpansionLimit);

      // Assert
      expect(result).toMatchObject(expected);
    }
  );
});
