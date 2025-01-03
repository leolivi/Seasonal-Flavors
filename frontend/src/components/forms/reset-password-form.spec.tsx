import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ResetPasswordForm } from "./reset-password-form";
import { handleResetPassword } from "@/services/user/PasswordPatch";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

jest.mock("@/services/user/PasswordPatch", () => ({
  handleResetPassword: jest.fn(),
}));

jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("ResetPasswordForm", () => {
  const mockRouter = { push: jest.fn() };
  const mockSearchParams = { get: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (useSearchParams as jest.Mock).mockReturnValue(mockSearchParams);
    mockSearchParams.get.mockImplementation((param) => {
      if (param === "token") return "mockToken";
      if (param === "email") return "test@example.com";
      return null;
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the form", () => {
    render(<ResetPasswordForm />);

    const passwordInput = screen.getByPlaceholderText("Neues Passwort");
    const passwordConfirmationInput = screen.getByPlaceholderText(
      "Passwort bestätigen",
    );
    const submitButton = screen.getByRole("button", {
      name: /Passwort zurücksetzen/i,
    });

    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmationInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("should render the form and submits with valid passwords", async () => {
    render(<ResetPasswordForm />);

    const passwordInput = screen.getByPlaceholderText("Neues Passwort");
    const passwordConfirmationInput = screen.getByPlaceholderText(
      "Passwort bestätigen",
    );
    const submitButton = screen.getByRole("button", {
      name: /Passwort zurücksetzen/i,
    });

    expect(passwordInput).toBeInTheDocument();
    expect(passwordConfirmationInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: "newPassword123!" } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: "newPassword123!" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleResetPassword).toHaveBeenCalledWith({
        data: {
          token: "mockToken",
          email: "test@example.com",
          password: "newPassword123!",
          password_confirmation: "newPassword123!",
        },
        toast: expect.any(Function),
        router: mockRouter,
      });
    });
  });

  test("should not submit with mismatched passwords", async () => {
    render(<ResetPasswordForm />);

    const passwordInput = screen.getByPlaceholderText("Neues Passwort");
    const passwordConfirmationInput = screen.getByPlaceholderText(
      "Passwort bestätigen",
    );
    const submitButton = screen.getByRole("button", {
      name: /Passwort zurücksetzen/i,
    });

    fireEvent.change(passwordInput, { target: { value: "newPassword123" } });
    fireEvent.change(passwordConfirmationInput, {
      target: { value: "differentPassword" },
    });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleResetPassword).not.toHaveBeenCalled();
    });
  });
});
