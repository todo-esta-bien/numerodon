interface IExtraAttrs {
  sumRecursively?: boolean;
  stopNumbers?: number[];
}

export const reduceNumberDigits = (
  number: number,
  { sumRecursively = false, stopNumbers = [] }: IExtraAttrs = {}
): number => {
  if (stopNumbers.includes(number)) {
    return number;
  }

  const result = `${number}` // e.g. '421'
    .split("") // e.g. ['4', '2', '1']
    .map((i) => +i) // e.g. [4, 2, 1]
    .reduce((carr, el) => carr + el); // e.g. 4 + 3 + 1

  return result < 10 || !sumRecursively
    ? result
    : reduceNumberDigits(result, { sumRecursively, stopNumbers });
};
