import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { handleUserPatch } from "@/services/user/userPatch";
import { handleImageUpload } from "@/services/image/imageUpload";
import ProfileForm from "./profile-form";

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
    render(<ProfileForm user={user} image={image} />);

    expect(
      screen.getByPlaceholderText("Profilbild hochladen"),
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText(user.username)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(user.email)).toBeInTheDocument();
  });

  test("should submit the form with changes", async () => {
    (handleUserPatch as jest.Mock).mockResolvedValueOnce({});
    (handleImageUpload as jest.Mock).mockResolvedValueOnce(
      "uploaded-image.jpg",
    );

    render(<ProfileForm user={user} image={image} />);

    // Change username and email
    fireEvent.change(screen.getByPlaceholderText(user.username), {
      target: { value: "newuser" },
    });
    fireEvent.change(screen.getByPlaceholderText(user.email), {
      target: { value: "new@example.com" },
    });

    // Simulate file upload
    const fileInput = screen.getByLabelText("Profilbild");
    const file = new File(["test content"], "test-image.png", {
      type: "image/png",
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Submit the form
    fireEvent.click(screen.getByText("speichern"));

    await waitFor(() => {
      expect(handleUserPatch).toHaveBeenCalledWith({
        data: expect.objectContaining({
          username: "newuser",
          email: "new@example.com",
          id: user.id,
        }),
        userData: user,
        toast: mockToast,
        router: mockRouter,
      });

      expect(handleImageUpload).toHaveBeenCalledWith(
        user.id,
        expect.any(File),
        "newuser",
        mockToast,
        "profile",
      );

      expect(mockToast).toHaveBeenCalledWith({
        title: "Daten gespeichert",
        description: "Dein Profil wurde erfolgreich angepasst.",
      });

      expect(mockRouter.refresh).toHaveBeenCalled();
    });
  });

  test("should not not submit the form if there are no changes", async () => {
    render(<ProfileForm user={user} image={image} />);

    fireEvent.click(screen.getByText("speichern"));

    await waitFor(() => {
      expect(mockToast).toHaveBeenCalledWith({
        title: "Keine Änderungen",
        description: "Es wurden keine Änderungen vorgenommen.",
      });
    });
  });
});
