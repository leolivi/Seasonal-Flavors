import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { handleUserPatch } from "@/services/user/userPatch";
import ProfileForm from "./profile-form";
import { SessionProvider } from "next-auth/react";
import { handleImageUpload } from "@/services/image/imageUpload";

jest.mock("@/hooks/use-toast");
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));
jest.mock("@/services/user/userPatch");
jest.mock("@/services/image/imageUpload");
jest.mock("@/services/image/imageDelete");

const mockToast = jest.fn();
const mockRouter = { refresh: jest.fn() };

beforeEach(() => {
  (useToast as jest.Mock).mockReturnValue({ toast: mockToast });
  (useRouter as jest.Mock).mockReturnValue(mockRouter);
});

afterEach(() => {
  jest.clearAllMocks();
});

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
        <ProfileForm user={user} image={image} />
      </SessionProvider>,
    );

    expect(
      screen.getByPlaceholderText("Profilbild hochladen"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
  });

  test("should submit the form with changes without a file", async () => {
    (handleUserPatch as jest.Mock).mockResolvedValueOnce({ success: true });

    render(
      <SessionProvider session={null}>
        <ProfileForm user={user} image={undefined} />
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
          profile_image: undefined,
        }),
        toast: expect.any(Function),
        userData: expect.any(Object),
      });

      expect(handleImageUpload).not.toHaveBeenCalled();

      expect(mockToast).toHaveBeenCalledWith({
        title: "Daten gespeichert",
        description: "Dein Profil wurde erfolgreich angepasst.",
      });
    });
  });

  test("should not submit the form if there are no changes", async () => {
    render(
      <SessionProvider session={null}>
        {" "}
        <ProfileForm user={user} image={image} />
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
