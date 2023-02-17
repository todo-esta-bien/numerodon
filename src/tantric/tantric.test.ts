import { TantricProfile, ITantricProfileConstructor } from "./tantric";

type TestCase = {
  birthday: ITantricProfileConstructor;
  expectedTantricProfile: Omit<TantricProfile, "day" | "month" | "year" | "tantricSumOptions">;
};

const testCases: TestCase[] = [
  {
    birthday: {
      day: 27,
      month: 12,
      year: 1994,
    },
    expectedTantricProfile: {
      soul: 9,
      karma: 3,
      divineGift: 4,
      lastLife: 5,
      path: 8,
    },
  },
  {
    birthday: {
      day: 7,
      month: 11,
      year: 1995,
    },
    expectedTantricProfile: {
      soul: 7,
      karma: 11,
      divineGift: 5,
      lastLife: 6,
      path: 6,
    },
  },
  {
    birthday: {
      day: 29,
      month: 10,
      year: 1910,
    },
    expectedTantricProfile: {
      soul: 11,
      karma: 10,
      divineGift: 10,
      lastLife: 11,
      path: 5,
    },
  },
  {
    birthday: {
      day: 11,
      month: 11,
      year: 1974,
    },
    expectedTantricProfile: {
      soul: 11,
      karma: 11,
      divineGift: 11,
      lastLife: 3,
      path: 7,
    },
  },
  {
    birthday: {
      day: 24,
      month: 4,
      year: 1971,
    },
    expectedTantricProfile: {
      soul: 6,
      karma: 4,
      divineGift: 8,
      lastLife: 9,
      path: 10,
    },
  },
  {
    birthday: {
      day: 5,
      month: 11,
      year: 1959,
    },
    expectedTantricProfile: {
      soul: 5,
      karma: 11,
      divineGift: 5,
      lastLife: 6,
      path: 22,
    },
  },
  {
    birthday: {
      day: 16,
      month: 11,
      year: 1957,
    },
    expectedTantricProfile: {
      soul: 7,
      karma: 11,
      divineGift: 3,
      lastLife: 22,
      path: 22,
    },
  },
  {
    birthday: {
      day: 2,
      month: 9,
      year: 1966,
    },
    expectedTantricProfile: {
      soul: 2,
      karma: 9,
      divineGift: 3,
      lastLife: 22,
      path: 6,
      // If we're looking for a 33 result, we should be concatenating the numbers,
      // instead of adding them individually.
      // path: 33,
    },
  },
];

describe("Testing TantricProfile", () => {
  it.each(testCases)("TantricProfile($birthday)", ({ birthday, expectedTantricProfile }) => {
    // Act
    const tantricProfile: TantricProfile = new TantricProfile({
      ...birthday,
    });

    // Assert
    expect(tantricProfile.soul).toBe(expectedTantricProfile.soul);
    expect(tantricProfile.karma).toBe(expectedTantricProfile.karma);
    expect(tantricProfile.divineGift).toBe(expectedTantricProfile.divineGift);
    expect(tantricProfile.lastLife).toBe(expectedTantricProfile.lastLife);
    expect(tantricProfile.path).toBe(expectedTantricProfile.path);

    expect(tantricProfile.day).toBe(birthday.day);
    expect(tantricProfile.month).toBe(birthday.month);
    expect(tantricProfile.year).toBe(birthday.year);
  });
});
