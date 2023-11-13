import { PlannerProfile, IPlannerProfileConstructor } from "./planner";

type PlannerProfileTestCase = {
  original: IPlannerProfileConstructor;
  expected: Partial<PlannerProfile>;
};

const plannerTestCases: PlannerProfileTestCase[] = [
  {
    original: {
      day: 27,
      month: 12,
      year: 1994,
      consultingMonth: 11,
      consultingYear: 2023,
    },
    expected: {
      annualVibration: 1,
      universalVibration: 9,
      personalVibration: 3,
      plannerDays: [
        null,
        null,
        null,
        {
          calendarDay: 1,
          personalDay: 4,
          universalDay: 1,
        },
        {
          calendarDay: 2,
          personalDay: 5,
          universalDay: 11,
        },
        {
          calendarDay: 3,
          personalDay: 6,
          universalDay: 3,
        },
        {
          calendarDay: 4,
          personalDay: 7,
          universalDay: 4,
        },
        {
          calendarDay: 5,
          personalDay: 8,
          universalDay: 5,
        },
        {
          calendarDay: 6,
          personalDay: 9,
          universalDay: 6,
        },
        {
          calendarDay: 7,
          personalDay: 1,
          universalDay: 7,
        },
        {
          calendarDay: 8,
          personalDay: 11,
          universalDay: 8,
        },
        {
          calendarDay: 9,
          personalDay: 3,
          universalDay: 9,
        },
        {
          calendarDay: 10,
          personalDay: 4,
          universalDay: 1,
        },
        {
          calendarDay: 11,
          personalDay: 5,
          universalDay: 2,
        },
        {
          calendarDay: 12,
          personalDay: 6,
          universalDay: 3,
        },
        {
          calendarDay: 13,
          personalDay: 7,
          universalDay: 22,
        },
        {
          calendarDay: 14,
          personalDay: 8,
          universalDay: 5,
        },
        {
          calendarDay: 15,
          personalDay: 9,
          universalDay: 6,
        },
        {
          calendarDay: 16,
          personalDay: 1,
          universalDay: 7,
        },
        {
          calendarDay: 17,
          personalDay: 2,
          universalDay: 8,
        },
        {
          calendarDay: 18,
          personalDay: 3,
          universalDay: 9,
        },
        {
          calendarDay: 19,
          personalDay: 22,
          universalDay: 1,
        },
        {
          calendarDay: 20,
          personalDay: 5,
          universalDay: 11,
        },
        {
          calendarDay: 21,
          personalDay: 6,
          universalDay: 3,
        },
        {
          calendarDay: 22,
          personalDay: 7,
          universalDay: 4,
        },
        {
          calendarDay: 23,
          personalDay: 8,
          universalDay: 5,
        },
        {
          calendarDay: 24,
          personalDay: 9,
          universalDay: 33,
        },
        {
          calendarDay: 25,
          personalDay: 1,
          universalDay: 7,
        },
        {
          calendarDay: 26,
          personalDay: 11,
          universalDay: 8,
        },
        {
          calendarDay: 27,
          personalDay: 3,
          universalDay: 9,
        },
        {
          calendarDay: 28,
          personalDay: 4,
          universalDay: 1,
        },
        {
          calendarDay: 29,
          personalDay: 5,
          universalDay: 11,
        },
        {
          calendarDay: 30,
          personalDay: 33,
          universalDay: 3,
        },
        null,
        null,
      ],
    },
  },
];

describe("PlannerProfile", () => {
  it.each(plannerTestCases)("PlannerProfile($original)", ({ original, expected }) => {
    // Act
    const profile = new PlannerProfile(original);

    // Assert
    expect(profile.annualVibration).toEqual(expected.annualVibration);
    expect(profile.universalVibration).toEqual(expected.universalVibration);
    expect(profile.personalVibration).toEqual(expected.personalVibration);
    expect(profile.plannerDays).toEqual(expected.plannerDays);
  });
});
