import { DiamondProfile, IDiamondProfileConstructor } from "./diamond";

type DiamondProfileTestCase = {
  original: IDiamondProfileConstructor;
  expected: Partial<DiamondProfile>;
};

const diamondTestCases: DiamondProfileTestCase[] = [
  {
    original: {
      day: 13,
      month: 3,
      year: 1963,
    },
    expected: {
      deepPersonality: 8, // PP
      starFacet: 16, // FE
      radiationSource: 6, // FR
      reflect: 9, // R
      keyResource: 13, // RC
    },
  },
  {
    original: {
      day: 2,
      month: 10,
      year: 1985,
    },
    expected: {
      deepPersonality: 17, // PP
      starFacet: 12, // FE
      radiationSource: 11, // FR
      reflect: 13, // R
      keyResource: 9, // RC
    },
  },
  {
    original: {
      day: 8,
      month: 11,
      year: 1956,
    },
    expected: {
      deepPersonality: 40, // PP
      starFacet: 19, // FE
      radiationSource: 5, // FR
      reflect: 11, // R
      keyResource: 13, // RC
    },
  },
  {
    original: {
      day: 19,
      month: 8,
      year: 1975,
    },
    expected: {
      deepPersonality: 13, // PP
      starFacet: 9, // FE
      radiationSource: 22, // FR
      reflect: 12, // R
      keyResource: 12, // RC
    },
  },
  {
    original: {
      day: 24,
      month: 3,
      year: 1960,
    },
    expected: {
      deepPersonality: 7, // PP
      starFacet: 9, // FE
      radiationSource: 16, // FR
      reflect: 6, // R
      keyResource: 12, // RC
    },
  },
];

describe("DiamondProfile", () => {
  it.each(diamondTestCases)("DiamondProfile($original)", ({ original, expected }) => {
    // Act
    const profile = new DiamondProfile(original);

    // Assert
    expect(profile.deepPersonality).toEqual(expected.deepPersonality);
    expect(profile.starFacet).toEqual(expected.starFacet);
    expect(profile.radiationSource).toEqual(expected.radiationSource);
    expect(profile.reflect).toEqual(expected.reflect);
    expect(profile.keyResource).toEqual(expected.keyResource);
  });
});
