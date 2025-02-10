import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

jest.mock("@/services/image/imageService");
jest.mock("@/services/user/userService");

// Global Test Configuration
beforeAll(() => {
  // Suppress console output during tests
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});
