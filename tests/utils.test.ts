import { reduceNumberDigits } from "../src/utils/utils";

describe("Testing Utils", () => {
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
      expect(reduceNumberDigits(number, { sumRecursively })).toEqual(
        expectedResult
      );
    }
  );
});
