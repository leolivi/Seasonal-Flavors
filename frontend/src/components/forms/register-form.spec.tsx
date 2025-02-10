import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { handleSignup } from "@/actions/auth-actions";
import { RegisterForm } from "./register-form";
import { SessionForm } from "@/utils/enum";

// mock the eye close icon
jest.mock("src/assets/icons/eye-close.svg", () => {
  const EyeCloseMock = () => <span>EyeCloseMock</span>;
  EyeCloseMock.displayName = "EyeCloseMock";
  return EyeCloseMock;
});

// mock the eye open icon
jest.mock("src/assets/icons/eye-open.svg", () => {
  const EyeOpenMock = () => <span>EyeOpenMock</span>;
  EyeOpenMock.displayName = "EyeOpenMock";
  return EyeOpenMock;
});

// mock the auth actions
jest.mock("@/actions/auth-actions", () => ({
  handleSignup: jest.fn(),
}));

/*
  @desc Test the register form
*/
describe("RegisterForm", () => {
  const setFormMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render all form fields", () => {
    render(<RegisterForm setForm={setFormMock} />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Passwort")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Passwort bestätigen"),
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Ich akzeptiere die Datenschutzerklärung/),
    ).toBeInTheDocument();
    expect(screen.getByText("registrieren")).toBeInTheDocument();
  });

  test("should show validation error when 'acceptDataPolicy' is not checked", async () => {
    render(<RegisterForm setForm={setFormMock} />);

    const submitButton = screen.getByText("registrieren");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Du musst die Datenschutzerklärung akzeptieren"),
      ).toBeInTheDocument();
    });
  });

  test("should show validation error when 'username' is missing", async () => {
    render(<RegisterForm setForm={setFormMock} />);

    fireEvent.click(
      screen.getByLabelText(/Ich akzeptiere die Datenschutzerklärung/),
    );

    const submitButton = screen.getByText("registrieren");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Benutzername ist erforderlich"),
      ).toBeInTheDocument();
      expect(screen.getByText("Ungültige E-Mail-Adresse")).toBeInTheDocument();
      expect(
        screen.getByText("Passwort muss mindestens 8 Zeichen lang sein"),
      ).toBeInTheDocument();
      expect(
        screen.getByText("Passwortbestätigung ist erforderlich"),
      ).toBeInTheDocument();
    });
  });

  test("should submit the form with valid data", async () => {
    const mockResponse = { status: 201 };
    (handleSignup as jest.Mock).mockResolvedValue(mockResponse);

    render(<RegisterForm setForm={setFormMock} />);

    fireEvent.input(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.input(screen.getByPlaceholderText("Email"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Passwort"), {
      target: { value: "Password123!" },
    });
    fireEvent.input(screen.getByPlaceholderText("Passwort bestätigen"), {
      target: { value: "Password123!" },
    });
    fireEvent.click(
      screen.getByLabelText(/Ich akzeptiere die Datenschutzerklärung/),
    );

    const submitButton = screen.getByText("registrieren");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSignup).toHaveBeenCalledWith(
        "testuser@example.com",
        "Password123!",
        "testuser",
      );
      expect(handleSignup).toHaveBeenCalledTimes(1);
    });
  });

  test("should navigate to login page when 'login' button is clicked", () => {
    render(<RegisterForm setForm={setFormMock} />);

    const loginButton = screen.getByText("hier anmelden");
    fireEvent.click(loginButton);

    expect(setFormMock).toHaveBeenCalledWith(SessionForm.LOGIN);
  });
});
