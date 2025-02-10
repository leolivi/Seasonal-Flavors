// mocks/test-mocks.ts
import { jest } from "@jest/globals";

// --- Mock Components --- //
export const mockCrossIcon = () => {
  const CrossMock = () => <span>CrossMock</span>;
  CrossMock.displayName = "CrossMock";
  return CrossMock;
};

export const mockPlusIcon = () => {
  const PlusMock = () => <span>PlusMock</span>;
  PlusMock.displayName = "PlusMock";
  return PlusMock;
};

// --- Mock Services --- //
export const mockServices = {
  recipeCreate: jest.fn(),
  recipePatch: jest.fn(),
  handleForgotPassword: jest.fn(),
  imageUpload: jest.fn(),
  imageDelete: jest.fn(),
};

// --- Mock Hooks --- //
export const mockToast = jest.fn();
export const mockUseToast = () => ({
  toast: mockToast,
});

// -- Setup function to automatically mock common dependencies -- //
export const setupCommonMocks = () => {
  // Mock toast
  jest.mock("@/hooks/use-toast", () => ({
    useToast: mockUseToast,
  }));

  // Mock services
  jest.mock("@/services/recipe/recipeCreate", () => ({
    handleCreateRecipe: mockServices.recipeCreate,
  }));

  jest.mock("@/services/recipe/recipePatch", () => ({
    handleRecipePatch: mockServices.recipePatch,
  }));

  jest.mock("@/services/user/PasswordPatch", () => ({
    handleForgotPassword: mockServices.handleForgotPassword,
  }));

  jest.mock("@/services/image/imageUpload", () => mockServices.imageUpload);
  jest.mock("@/services/image/imageDelete", () => mockServices.imageDelete);

  // Mock icons
  jest.mock("src/assets/icons/cross.svg", () => mockCrossIcon());
  jest.mock("src/assets/icons/plus.svg", () => mockPlusIcon());
};

// --- Cleanup function --- //
export const clearCommonMocks = () => {
  jest.clearAllMocks();
};
