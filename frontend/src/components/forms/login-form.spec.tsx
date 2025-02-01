import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { LoginForm } from "./login-form";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

jest.mock("next-auth/react", () => ({
  signIn: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("LoginForm", () => {
  const mockRouter = { push: jest.fn() };
  const setFormMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("should render the form ", () => {
    render(<LoginForm setForm={setFormMock} />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Passwort");
    const submitButton = screen.getByRole("button", { name: /anmelden/i });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("should submit the form with valid credentials", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ error: null });

    render(<LoginForm setForm={setFormMock} />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Passwort");
    const submitButton = screen.getByRole("button", { name: /anmelden/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "Password123!" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith("credentials", {
        redirect: false,
        email: "test@example.com",
        password: "Password123!",
      });
      expect(mockRouter.push).toHaveBeenCalledWith("/my-recipes");
    });
  });

  test("should display an error message on failed login", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({
      error: "Passwort muss mindestens einen Großbuchstaben enthalten",
    });

    render(<LoginForm setForm={setFormMock} />);

    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Passwort");
    const submitButton = screen.getByRole("button", { name: /anmelden/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "wrongpassword" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText(
          "Passwort muss mindestens einen Großbuchstaben enthalten",
        ),
      ).toBeInTheDocument();
    });
  });
});
