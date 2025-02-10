import { jest } from "@jest/globals";

// TODO: make this working

// Mock Router
export const mockRouter = {
  push: jest.fn(),
  back: jest.fn(),
};

// --- Mock Services --- //
export const mockServices = {
  recipeCreate: jest.fn(),
  handleForgotPassword: jest.fn(),
  imageUpload: jest.fn(),
};

// --- Mock Hooks --- //
export const mockToast = jest.fn();
export const mockUseToast = () => ({
  toast: mockToast,
});

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

// -- Setup function to automatically mock common dependencies -- //
export const setupCommonMocks = () => {
  // Mock next/navigation
  jest.mock("next/navigation", () => ({
    useRouter: () => mockRouter,
  }));

  // Mock toast
  jest.mock("@/hooks/use-toast", () => ({
    useToast: mockUseToast,
  }));

  // Mock services
  jest.mock("@/services/recipe/recipeCreate", () => ({
    handleCreateRecipe: mockServices.recipeCreate,
  }));

  jest.mock("@/services/user/PasswordPatch", () => ({
    handleForgotPassword: mockServices.handleForgotPassword,
  }));

  jest.mock("@/services/image/imageUpload", () => mockServices.imageUpload);

  // Mock icons
  jest.mock("src/assets/icons/cross.svg", () => mockCrossIcon());
  jest.mock("src/assets/icons/plus.svg", () => mockPlusIcon());
};

// --- Cleanup function --- //
export const clearCommonMocks = () => {
  jest.clearAllMocks();
};
