import {
  getLetterValue,
  getLetterSumFromWord,
  reduceNumberDigits,
  type LetterSumResult,
  cleanString,
  getLetterSumFromString,
  NumberReducer,
  repeatArrayElements,
} from "./utils";

describe("Testing reduceNumberDigits", () => {
  it.each([
    [0, 0, true],
    [0, 0, false],
    [12, 3, true], // For months
    [12, 3, false], // For months
    [1995, 6, true], // For years recursively
    [1995, 24, false], // For years not recursively
  ])(
    "Should sum all the digit from '%s/%s'. Recursively: %s",
    (number: number, expectedResult: Number, sumRecursively: boolean) => {
      expect(reduceNumberDigits({ sumRecursively })(number)).toEqual(expectedResult);
    }
  );
});

describe("Testing cleanString", () => {
  it.each([
    ["María Rodríguez", "maria rodriguez"],
    ["Bâillement SOLFÈGE", "baillement solfege"],
    ["BâillementSOLFÈGE", "baillementsolfege"],
    ["EMBLÈME", "embleme"],
  ])("should go form %s to %s", (original: string, expected: string) => {
    expect(cleanString(original)).toEqual(expected);
  });
});

describe("Testing getLetterValue", () => {
  it.each([
    ["a", 1],
    ["b", 2],
    ["c", 3],
    ["d", 4],
    ["e", 5],
    ["f", 6],
    ["g", 7],
    ["h", 8],
    ["i", 9],
    ["j", 1],
    ["k", 2],
    ["l", 3],
    ["m", 4],
    ["n", 5],
    ["o", 6],
    ["p", 7],
    ["q", 8],
    ["r", 9],
    ["s", 1],
    ["t", 2],
    ["u", 3],
    ["v", 4],
    ["w", 5],
    ["x", 6],
    ["y", 7],
    ["z", 8],
    ["ñ", -1],
    ["hola", -1],
  ])("Should get the value of %s = %s", (letter: string, expectedValue: number) => {
    expect(getLetterValue(letter)).toEqual(expectedValue);
  });
});

describe("Testing getLetterSumFromWord", () => {
  it.each([
    ["ayanely", { vowelSum: 5, consonantSum: 6, totalSum: 11 }],
    ["yliza", { vowelSum: 8, consonantSum: 11, totalSum: 1 }],
    ["yanez", { vowelSum: 6, consonantSum: 2, totalSum: 8 }],
    ["loyola", { vowelSum: 4, consonantSum: 4, totalSum: 8 }],
    ["monroy", { vowelSum: 1, consonantSum: 9, totalSum: 1 }],
    ["yyani", { vowelSum: 8, consonantSum: 3, totalSum: 11 }],
  ])("Should get the value of %s as %s", (word: string, expectedResult: LetterSumResult) => {
    // Arrange
    const numberReducer: NumberReducer = reduceNumberDigits({
      sumRecursively: true,
      stopNumbers: [11, 22],
    });

    // Act
    const result: LetterSumResult = getLetterSumFromWord(word, numberReducer);

    // Assert
    expect(result).toMatchObject(expectedResult);
  });
});

describe("Testing getLetterSumFromString", () => {
  it.each([
    ["yyani", { vowelSum: 8, consonantSum: 3, totalSum: 11 }],
    ["Gustavo Andrés Giordano", { vowelSum: 11, consonantSum: 4, totalSum: 6 }],
    ["Miley Ray Cyrus", { vowelSum: 3, consonantSum: 2, totalSum: 5 }],
  ])('Should get the value of "%s" as %s', (sentence: string, expectedResult: LetterSumResult) => {
    // Act
    const result: LetterSumResult = getLetterSumFromString(sentence, {
      sumRecursively: true,
      stopNumbers: [11, 22],
    });

    // Assert
    expect(result).toMatchObject(expectedResult);
  });
});

describe("Testing repeatArrayElements", () => {
  it.each([
    [[0, 1, 2, 3, 4], 3, [0, 1, 2]],
    [[0, 1, 2, 3, 4], 4, [0, 1, 2, 3]],
    [[0, 1, 2, 3, 4], 5, [0, 1, 2, 3, 4]],
    [[0, 1, 2, 3, 4], 6, [0, 1, 2, 3, 4, 0]],
    [[0, 1, 2, 3, 4], 10, [0, 1, 2, 3, 4, 0, 1, 2, 3, 4]],
    [[0, 1, 2, 3, 4], 12, [0, 1, 2, 3, 4, 0, 1, 2, 3, 4, 0, 1]],
  ])('"%s" should be expanded to "%s"', (original: number[], elementsAmount: number, expected: number[]) => {
    // Act
    const result: number[] = repeatArrayElements(original, elementsAmount);

    // Assert
    expect(result).toEqual(expected);
  });
});
