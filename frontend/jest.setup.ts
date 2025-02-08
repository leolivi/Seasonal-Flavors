import "@testing-library/jest-dom";
import { enableFetchMocks } from "jest-fetch-mock";

enableFetchMocks();

jest.mock("@/services/image/imageService");
jest.mock("@/services/user/userService");

// Globale Test-Konfiguration
beforeAll(() => {
  // Unterdrücke Konsolenausgaben während der Tests
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});
