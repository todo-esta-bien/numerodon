const VOWELS = ["a", "e", "i", "o", "u"];

export interface ReduceNumberDigitsAttrs {
  sumRecursively?: boolean;
  stopNumbers?: number[];
}

export type LetterSumResult = {
  vowelSum: number;
  consonantSum: number;
  totalSum: number;
};

export type NumberReducer = (number: number) => number;

export const reduceNumberDigits =
  ({ sumRecursively = false, stopNumbers = [] }: ReduceNumberDigitsAttrs = {}): NumberReducer =>
  (number: number): number => {
    if (stopNumbers.includes(number)) {
      return number;
    }

    const result: number = `${number}` // e.g. '421'
      .split("") // e.g. ['4', '2', '1']
      .map((i) => +i) // e.g. [4, 2, 1]
      .reduce((carr, el) => carr + el); // e.g. 4 + 2 + 1

    return result < 10 || !sumRecursively ? result : reduceNumberDigits({ sumRecursively, stopNumbers })(result);
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
  const [_, value] = Object.entries(letterNumberMap).find(([key, _]) => key.includes(letter)) || [null, -1];
  return value;
};

export const cleanString = (str: string): string =>
  str // e.g. 'María Rodríguez'
    .toLowerCase() // e.g. 'maría rodríguez'
    .normalize("NFD") // e.g. 'mar´ia rodr´iguez'
    .replace(/\p{Diacritic}/gu, ""); // e.g. 'maria rodriguez'

export const getLetterSumFromWord = (word: string, numberReducer: NumberReducer): LetterSumResult => {
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
    vowelSum: numberReducer(vowelSum),
    consonantSum: numberReducer(consonantSum),
    totalSum: numberReducer(vowelSum + consonantSum),
  };
};

export const getLetterSumFromString = (
  str: string,
  reduceNumberAttrs: ReduceNumberDigitsAttrs = {}
): LetterSumResult => {
  const numberReducer: NumberReducer = reduceNumberDigits(reduceNumberAttrs);

  const addedResult: LetterSumResult = cleanString(str) // e.g. 'María Rodríguez' -> 'maria rodriguez'
    .split(" ") // e.g. ['maria', 'rodriguez']
    .map((word: string) => getLetterSumFromWord(word, numberReducer)) // e.g. [{vowelSum...}, {vowelSum...}]
    .reduce((prevResult: LetterSumResult, currentResult: LetterSumResult) => ({
      // e.g. {vowelSum...}
      vowelSum: prevResult.vowelSum + currentResult.vowelSum,
      consonantSum: prevResult.consonantSum + currentResult.consonantSum,
      totalSum: prevResult.totalSum + currentResult.totalSum,
    }));

  return {
    vowelSum: numberReducer(addedResult.vowelSum),
    consonantSum: numberReducer(addedResult.consonantSum),
    totalSum: numberReducer(addedResult.totalSum),
  };
};

export const repeatArrayElements = <T>(originalArray: T[], elementsAmount: number): T[] => {
  if (elementsAmount <= originalArray.length) {
    return originalArray.slice(0, elementsAmount);
  }

  const completeTimes = Math.floor(elementsAmount / originalArray.length);
  const repeatedCompleteArrays = Array.from({ length: completeTimes }, (_) => [...originalArray]).flat();

  const remainder = elementsAmount % originalArray.length;
  const missingElements = Array.from({ length: remainder }, (_, idx) => originalArray[idx]);

  return [...repeatedCompleteArrays, ...missingElements];
};

export const generateExpandedNames = (str: string, expansionLimit: number): string[] => {
  const cleanedNameLetters: string[] = cleanString(str).replace(/\s/g, "").split("");

  if (cleanedNameLetters.length === 0) {
    return new Array(expansionLimit).fill(" ");
  }

  const result: string[] = [];
  let currentLetterIdx = 0;
  let repetitionsCount = 0;
  let letterMaxRepetitions = getLetterValue(cleanedNameLetters[currentLetterIdx]);

  for (let i = 0; i < expansionLimit; i++) {
    if (repetitionsCount >= letterMaxRepetitions) {
      currentLetterIdx = (currentLetterIdx + 1) % cleanedNameLetters.length;
      repetitionsCount = 0;
      letterMaxRepetitions = getLetterValue(cleanedNameLetters[currentLetterIdx]);
    }

    result.push(cleanedNameLetters[currentLetterIdx]);
    repetitionsCount++;
  }

  return result;
};
