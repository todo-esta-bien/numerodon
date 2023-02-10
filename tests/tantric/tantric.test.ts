import { TantricProfile } from "src/tantric/tantric";

describe("Testing TantricProfile", () => {
  it("Should work with 27/12/1994", () => {
    // Act
    const tantricProfile: TantricProfile = new TantricProfile({
      day: 27,
      month: 12,
      year: 1994,
    });

    // Assert
    expect(tantricProfile.soul).toBe(9);
    expect(tantricProfile.karma).toBe(3);
    expect(tantricProfile.divineGift).toBe(4);
    expect(tantricProfile.lastLife).toBe(5);
    expect(tantricProfile.path).toBe(8);
  });

  it("Should work with 7/11/1995", () => {
    // Act
    const tantricProfile: TantricProfile = new TantricProfile({
      day: 7,
      month: 11,
      year: 1995,
    });

    // Assert
    expect(tantricProfile.soul).toBe(7);
    expect(tantricProfile.karma).toBe(11);
    expect(tantricProfile.divineGift).toBe(5);
    expect(tantricProfile.lastLife).toBe(6);
    expect(tantricProfile.path).toBe(6);
  });

  it("Should work with 29/10/1910", () => {
    // Act
    const tantricProfile: TantricProfile = new TantricProfile({
      day: 29,
      month: 10,
      year: 1910,
    });

    // Assert
    expect(tantricProfile.soul).toBe(11);
    expect(tantricProfile.karma).toBe(10);
    expect(tantricProfile.divineGift).toBe(10);
    expect(tantricProfile.lastLife).toBe(11);
    expect(tantricProfile.path).toBe(5);
  });

  it("Should work with 11/11/1974", () => {
    // Act
    const tantricProfile: TantricProfile = new TantricProfile({
      day: 11,
      month: 11,
      year: 1974,
    });

    // Assert
    expect(tantricProfile.soul).toBe(11);
    expect(tantricProfile.karma).toBe(11);
    expect(tantricProfile.divineGift).toBe(11);
    expect(tantricProfile.lastLife).toBe(3);
    expect(tantricProfile.path).toBe(7);
  });

  it("Should work with 24/04/1971", () => {
    // Act
    const tantricProfile: TantricProfile = new TantricProfile({
      day: 24,
      month: 4,
      year: 1971,
    });

    // Assert
    expect(tantricProfile.soul).toBe(6);
    expect(tantricProfile.karma).toBe(4);
    expect(tantricProfile.divineGift).toBe(8);
    expect(tantricProfile.lastLife).toBe(9);
    expect(tantricProfile.path).toBe(10);
  });

  it("Should work with 5/11/1959", () => {
    // Act
    const tantricProfile: TantricProfile = new TantricProfile({
      day: 5,
      month: 11,
      year: 1959,
    });

    // Assert
    expect(tantricProfile.soul).toBe(5);
    expect(tantricProfile.karma).toBe(11);
    expect(tantricProfile.divineGift).toBe(5);
    expect(tantricProfile.lastLife).toBe(6);
    expect(tantricProfile.path).toBe(22);
  });

  it("Should work with 2/09/1966", () => {
    // Act
    const tantricProfile: TantricProfile = new TantricProfile({
      day: 2,
      month: 9,
      year: 1966,
    });

    // Assert
    expect(tantricProfile.soul).toBe(2);
    expect(tantricProfile.karma).toBe(9);
    expect(tantricProfile.divineGift).toBe(3);
    expect(tantricProfile.lastLife).toBe(22);
    expect(tantricProfile.path).toBe(6);
    // If we're looking for a 33 result, we should be concatenating the numbers,
    // instead of adding them individually.
    // expect(tantricProfile.path).toBe(33);
  });

  it("Should work with 16/11/1957", () => {
    // Act
    const tantricProfile: TantricProfile = new TantricProfile({
      day: 16,
      month: 11,
      year: 1957,
    });

    // Assert
    expect(tantricProfile.soul).toBe(7);
    expect(tantricProfile.karma).toBe(11);
    expect(tantricProfile.divineGift).toBe(3);
    expect(tantricProfile.lastLife).toBe(22);
    expect(tantricProfile.path).toBe(22);
  });
});
