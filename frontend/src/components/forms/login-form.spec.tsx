/* eslint-disable react/display-name */
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SessionForm } from "@/app/session/page";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LoginForm } from "./login-form";

jest.mock("src/assets/icons/eye-close.svg", () => () => (
  <span>EyeCloseMock</span>
));
jest.mock("src/assets/icons/eye-open.svg", () => () => (
  <span>EyeOpenMock</span>
));

jest.mock("next-auth/react");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("react-hook-form", () => {
  const actual = jest.requireActual("react-hook-form");
  return {
    ...actual,
    useForm: jest.fn(() => actual.useForm()),
  };
});

describe("LoginForm", () => {
  const setFormMock = jest.fn();
  const pushMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    (signIn as jest.Mock).mockResolvedValue({ error: null });
    setFormMock.mockClear();
    pushMock.mockClear();
  });

  test("renders the email and password input fields and submit button", () => {
    render(<LoginForm setForm={setFormMock} />);

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /anmelden/i }),
    ).toBeInTheDocument();
  });

  test("submits the form successfully and navigates to the dashboard on successful login", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ error: null });

    render(<LoginForm setForm={setFormMock} />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /anmelden/i }));

    await waitFor(() => {
      expect(pushMock).toHaveBeenCalledWith("/my-recipes");
    });
  });

  test("displays an error message when login fails", async () => {
    (signIn as jest.Mock).mockResolvedValueOnce({ error: "Login failed" });

    const { debug } = render(<LoginForm setForm={setFormMock} />);

    fireEvent.change(screen.getByPlaceholderText("Email"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Password"), {
      target: { value: "wrongpassword" },
    });
    fireEvent.click(screen.getByRole("button", { name: /anmelden/i }));

    await waitFor(() => {
      expect(
        screen.getByText("Login fehlgeschlagen, bitte versuche es erneut"),
      ).toBeInTheDocument();
    });
    debug();
  });

  test("calls setForm to switch to registration form when 'register' button is clicked", () => {
    render(<LoginForm setForm={setFormMock} />);

    fireEvent.click(screen.getByRole("button", { name: /hier registrieren/i }));

    expect(setFormMock).toHaveBeenCalledWith(SessionForm.REGISTER);
  });
});
