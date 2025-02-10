import { Season } from "./Season";

// Mock the Date class
const mockDate = (dateString: string) => {
  const date = new Date(dateString);
  jest.spyOn(global, "Date").mockImplementation(() => date as unknown as Date);
};

/*
  @desc Test for Season.tsx
*/
describe("Season", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("should return correct season and color for spring", () => {
    mockDate("2024-03-01");
    const season = new Season();
    expect(Season.getSeason()).toBe("spring");
    expect(season.getColor()).toBe("sfgreen");

    mockDate("2024-04-01");
    expect(Season.getSeason()).toBe("spring");
    expect(season.getColor()).toBe("sfgreen");

    mockDate("2024-05-01");
    expect(Season.getSeason()).toBe("spring");
    expect(season.getColor()).toBe("sfgreen");
  });

  test("should return correct season and color for summer", () => {
    mockDate("2024-06-01");
    const season = new Season();
    expect(Season.getSeason()).toBe("summer");
    expect(season.getColor()).toBe("sforange");

    mockDate("2024-07-01");
    expect(Season.getSeason()).toBe("summer");
    expect(season.getColor()).toBe("sforange");

    mockDate("2024-08-01");
    expect(Season.getSeason()).toBe("summer");
    expect(season.getColor()).toBe("sforange");
  });

  test("should return correct season and color for autumn", () => {
    mockDate("2024-09-01");
    const season = new Season();
    expect(Season.getSeason()).toBe("autumn");
    expect(season.getColor()).toBe("sfred");

    mockDate("2024-10-01");
    expect(Season.getSeason()).toBe("autumn");
    expect(season.getColor()).toBe("sfred");

    mockDate("2024-11-01");
    expect(Season.getSeason()).toBe("autumn");
    expect(season.getColor()).toBe("sfred");
  });

  test("should return correct season and color for winter", () => {
    mockDate("2024-12-01");
    const season = new Season();
    expect(Season.getSeason()).toBe("winter");
    expect(season.getColor()).toBe("sfblue");

    mockDate("2024-01-01");
    expect(Season.getSeason()).toBe("winter");
    expect(season.getColor()).toBe("sfblue");

    mockDate("2024-02-01");
    expect(Season.getSeason()).toBe("winter");
    expect(season.getColor()).toBe("sfblue");
  });
});
