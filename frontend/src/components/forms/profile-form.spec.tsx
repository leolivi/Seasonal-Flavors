import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/user/userService";
import ProfileForm from "./profile-form";
import { SessionProvider } from "next-auth/react";
import { handleUserPatch } from "@/services/user/userPatch";

// mock the toast
jest.mock("@/hooks/use-toast");
// mock the next/navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
// mock the user patch service
jest.mock("@/services/user/userPatch");
// mock the user service
jest.mock("@/services/user/userService");

const mockToast = jest.fn();
const mockRouter = { refresh: jest.fn() };

beforeEach(() => {
  (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
});

afterEach(() => {
  jest.clearAllMocks();
});

/*
  @desc Test the profile form
*/
describe("ProfileForm", () => {
  const user = {
    id: 1,
    username: "testuser",
    email: "test@example.com",
  };

  const image = {
    id: 1,
    file_path: "path/to/image.jpg",
    alt_text: "Ein Bild",
  };

  test("should render the form with default values", () => {
    render(
      <SessionProvider session={null}>
        <ProfileForm
          user={user}
          image={image}
          onImageUpdate={() => {}}
          setUserData={() => {}}
          onUserUpdate={() => {}}
        />
      </SessionProvider>,
    );

    expect(screen.getByTestId("profile-image-upload")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
  });

  test("should submit the form with changes without a file", async () => {
    const updatedUser = {
      ...user,
      username: "newuser",
      email: "new@example.com",
    };

    (handleUserPatch as jest.Mock).mockResolvedValueOnce({ success: true });
    (getCurrentUser as jest.Mock).mockResolvedValueOnce(updatedUser);

    const mockSetUserData = jest.fn();
    const mockOnUserUpdate = jest.fn();

    render(
      <SessionProvider session={null}>
        <ProfileForm
          user={user}
          image={undefined}
          onImageUpdate={() => {}}
          setUserData={mockSetUserData}
          onUserUpdate={mockOnUserUpdate}
        />
      </SessionProvider>,
    );

    fireEvent.change(screen.getByPlaceholderText("username"), {
      target: { value: "newuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("email"), {
      target: { value: "new@example.com" },
    });

    fireEvent.click(screen.getByText("speichern"));

    await waitFor(() => {
      expect(handleUserPatch).toHaveBeenCalledWith({
        data: expect.objectContaining({
          username: "newuser",
          email: "new@example.com",
          id: user.id,
        }),
        userData: user,
      });

      expect(getCurrentUser).toHaveBeenCalled();
      expect(mockSetUserData).toHaveBeenCalledWith(updatedUser);
      expect(mockOnUserUpdate).toHaveBeenCalledWith(updatedUser);
      expect(mockToast).toHaveBeenCalledWith(
        expect.objectContaining({
          title: "Erfolgreich!",
          description: "Dein Profil wurde aktualisiert.",
          variant: "default",
        }),
      );
    });
  });

  test("should not submit the form if there are no changes", async () => {
    render(
      <SessionProvider session={null}>
        <ProfileForm
          user={user}
          image={image}
          onImageUpdate={() => {}}
          setUserData={() => {}}
          onUserUpdate={() => {}}
        />
      </SessionProvider>,
    );

    fireEvent.click(screen.getByText("speichern"));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Keine Änderungen",
        description: "Es wurden keine Änderungen vorgenommen.",
      });
    });
  });
});
