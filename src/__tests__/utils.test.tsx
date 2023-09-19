import {
  upperCaseFirstLetterHelper,
  getRandomLevelHelper,
  extractLevelFromName,
} from "@/utils/utils";

describe("Utility functions", () => {
  describe("upperCaseFirstLetterHelper", () => {
    it("should capitalize the first letter of the word", () => {
      expect(upperCaseFirstLetterHelper("pokemon")).toBe("Pokemon");
      expect(upperCaseFirstLetterHelper("charizard")).toBe("Charizard");
    });
  });

  describe("getRandomLevelHelper", () => {
    it("should return a number within the specified range", () => {
      const result = getRandomLevelHelper(1, 100);
      expect(result).toBeGreaterThanOrEqual(1);
      expect(result).toBeLessThanOrEqual(100);
    });
  });

  describe("extractLevelFromName", () => {
    it("should extract the level from the name string", () => {
      expect(extractLevelFromName("Charizard (lvl: 50)")).toBe(50);
      expect(extractLevelFromName("Bulbasaur")).toBe(0);
      expect(extractLevelFromName("Squirtle (lvl: 10)")).toBe(10);
    });
  });
});
