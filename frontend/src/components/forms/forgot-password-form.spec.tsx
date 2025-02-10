import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { handleForgotPassword } from "@/services/user/PasswordPatch";
import { useRouter } from "next/navigation";
import { ForgotPasswordForm } from "./forgot-password-form";

// mock the password patch service
jest.mock("@/services/user/PasswordPatch", () => ({
  handleForgotPassword: jest.fn(),
}));

// mock the toast
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(() => ({
    toast: jest.fn(),
  })),
}));

// mock the next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

/*
  @desc Test the forgot password form
*/
describe("ForgotPasswordForm", () => {
  const mockRouter = { push: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the form", () => {
    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: /Email senden/i });

    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("should submits with valid email", async () => {
    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: /Email senden/i });

    expect(emailInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleForgotPassword).toHaveBeenCalledWith({
        data: { email: "test@example.com" },
        toast: expect.any(Function),
      });
    });
  });

  test("should not submit with invalid email", async () => {
    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: /Email senden/i });

    fireEvent.change(emailInput, { target: { value: "invalid-email" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleForgotPassword).not.toHaveBeenCalled();
    });
  });

  test("should not submit with empty email", async () => {
    render(<ForgotPasswordForm />);

    const emailInput = screen.getByPlaceholderText("Email");
    const submitButton = screen.getByRole("button", { name: /Email senden/i });

    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleForgotPassword).not.toHaveBeenCalled();
    });
  });
});
