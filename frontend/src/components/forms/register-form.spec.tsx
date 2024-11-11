import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { handleSignup } from "@/actions/auth-actions"; // Mock this function
import { SessionForm } from "@/app/(unauthenticated)/session/page";
import { RegisterForm } from "./register-form";

jest.mock("src/assets/icons/eye-close.svg", () => () => (
  <span>EyeCloseMock</span>
));
jest.mock("src/assets/icons/eye-open.svg", () => () => (
  <span>EyeOpenMock</span>
));

jest.mock("@/actions/auth-actions", () => ({
  handleSignup: jest.fn(),
}));

describe("RegisterForm", () => {
  const setFormMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all form fields", () => {
    render(<RegisterForm setForm={setFormMock} />);

    expect(screen.getByPlaceholderText("Username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("E-mail")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Ich akzeptiere die Datenschutzerklärung/),
    ).toBeInTheDocument();
    expect(screen.getByText("registrieren")).toBeInTheDocument();
  });

  test("shows validation error when 'acceptDataPolicy' is not checked", async () => {
    const { debug } = render(<RegisterForm setForm={setFormMock} />);

    const submitButton = screen.getByText("registrieren");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(
        screen.getByText("Bitte bestätige die Datenschutzerklärung"),
      ).toBeInTheDocument();
    });
    debug();
  });

  test("calls handleSignup with correct data on valid form submission", async () => {
    const mockResponse = { status: 201 };
    (handleSignup as jest.Mock).mockResolvedValue(mockResponse);

    render(<RegisterForm setForm={setFormMock} />);

    fireEvent.input(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.input(screen.getByPlaceholderText("E-mail"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(
      screen.getByLabelText(/Ich akzeptiere die Datenschutzerklärung/),
    );

    const submitButton = screen.getByText("registrieren");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(handleSignup).toHaveBeenCalledWith(
        "testuser@example.com",
        "password123",
        "testuser",
      );
      expect(handleSignup).toHaveBeenCalledTimes(1);
    });
  });

  test("displays success message based on signup response", async () => {
    const successResponse = { status: 201 };
    (handleSignup as jest.Mock).mockResolvedValue(successResponse);

    // Mock console.log to capture output
    const logSpy = jest.spyOn(console, "log").mockImplementation();

    render(<RegisterForm setForm={setFormMock} />);

    fireEvent.input(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.input(screen.getByPlaceholderText("E-mail"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(
      screen.getByLabelText(/Ich akzeptiere die Datenschutzerklärung/),
    );

    const submitButton = screen.getByText("registrieren");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith(
        "Signup successful: ",
        successResponse,
      );
    });

    logSpy.mockRestore();
  });

  test("displays failure message based on signup response", async () => {
    const failureResponse = { status: 400 };
    (handleSignup as jest.Mock).mockResolvedValue(failureResponse);

    // Mock console.log to capture output
    const logSpy = jest.spyOn(console, "log").mockImplementation();

    render(<RegisterForm setForm={setFormMock} />);

    fireEvent.input(screen.getByPlaceholderText("Username"), {
      target: { value: "testuser" },
    });
    fireEvent.input(screen.getByPlaceholderText("E-mail"), {
      target: { value: "testuser@example.com" },
    });
    fireEvent.input(screen.getByPlaceholderText("Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(
      screen.getByLabelText(/Ich akzeptiere die Datenschutzerklärung/),
    );

    const submitButton = screen.getByText("registrieren");
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith("Signup failed: ", failureResponse);
    });

    logSpy.mockRestore();
  });

  test("navigates to login page when 'login' button is clicked", () => {
    render(<RegisterForm setForm={setFormMock} />);

    const loginButton = screen.getByText("hier anmelden");
    fireEvent.click(loginButton);

    expect(setFormMock).toHaveBeenCalledWith(SessionForm.LOGIN);
  });
});
