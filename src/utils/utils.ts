const VOWELS = ["a", "e", "i", "o", "u"];

interface ReduceNumberDigitsAttrs {
  sumRecursively?: boolean;
  stopNumbers?: number[];
}

export type LetterSumResult = {
  vowelSum: number;
  consonantSum: number;
  totalSum: number;
};

export const reduceNumberDigits = (
  number: number,
  { sumRecursively = false, stopNumbers = [] }: ReduceNumberDigitsAttrs = {}
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

export const getLetterValue = (letter: string): number => {
  const letterNumberMap = {
    ajs: 1,
    bkt: 2,
    clu: 3,
    dmv: 4,
    enw: 5,
    fox: 6,
    gpy: 7,
    hqz: 8,
    ir: 9,
  };

  if (letter.length > 1) return -1;
  const [_, value] = Object.entries(letterNumberMap).find(([key, _]) =>
    key.includes(letter)
  ) || [null, -1];
  return value;
};

export const getLetterSumFromWord = (
  word: string,
  reduceNumberAttrs: ReduceNumberDigitsAttrs = {}
): LetterSumResult => {
  // We expect the word to be cleaned and in lowercase
  const letters = word.split("");

  let vowelSum = 0;
  let consonantSum = 0;

  let leftPointer = 0;

  // Y may be considered as vowel or consonant based on its position:
  // - if Y is next to a vowel, it's a consonant
  // - if Y is next to a consonant, it's a vowel
  // - if Y is the last letter of the word, it's a vowel

  // Iterate each letter with the rightPointer
  for (let rightPointer = 0; rightPointer < letters.length; rightPointer++) {
    const currentLetter = letters[rightPointer];

    // If previous letter was 'y'
    if (rightPointer !== leftPointer) {
      // If current letter is vowel
      if (VOWELS.includes(currentLetter)) {
        // 'y' is consonant
        consonantSum += getLetterValue("y");
      } else {
        // 'y' is vowel
        vowelSum += getLetterValue("y");
      }

      // Sync pointers again
      leftPointer = rightPointer;
    }

    if (currentLetter === "y") {
      if (rightPointer === letters.length - 1) {
        // last letter of the word, 'y' is vowel
        vowelSum += getLetterValue("y");
      }

      // continue to see if the next letter is vowel or consonant
      continue;
    }

    if (VOWELS.includes(currentLetter)) {
      vowelSum += getLetterValue(currentLetter);
    } else {
      consonantSum += getLetterValue(currentLetter);
    }

    leftPointer += 1;
  }

  return {
    vowelSum: reduceNumberDigits(vowelSum, reduceNumberAttrs),
    consonantSum: reduceNumberDigits(consonantSum, reduceNumberAttrs),
    totalSum: reduceNumberDigits(vowelSum + consonantSum, reduceNumberAttrs),
  };
};

export const getLetterSumFromString = (str: string) => {
  // TODO: Implement this
  // TODO: Clean accents, punctuation and all of that stuff
  const words = str.split(" ");
};
