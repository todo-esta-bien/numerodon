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
      expandedPhysicalPlane: "cccrrrrrrr".split(""),
      expandedPhysicalPlaneLetterValues: [3, 3, 3, 9, 9, 9, 9, 9, 9, 9],
      expandedEmotionalPlane: "eeeeespppp".split(""),
      expandedEmotionalPlaneLetterValues: [5, 5, 5, 5, 5, 1, 7, 7, 7, 7],
      expandedPersonalYears: [6, 7, 8, 9, 1, 11, 3, 4, 5, 6],
      expandedRealizationNumbers: "9999999999".split(""),
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
    expect(destinyTable.expandedEmotionalPlane).toMatchObject(expected.expandedEmotionalPlane);
    expect(destinyTable.expandedEmotionalPlaneLetterValues).toMatchObject(expected.expandedEmotionalPlaneLetterValues);
    expect(destinyTable.expandedPersonalYears).toMatchObject(expected.expandedPersonalYears);
    expect(destinyTable.expandedRealizationNumbers).toMatchObject(expected.expandedRealizationNumbers);
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
});
