import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileDropdown from "./profile-dropdown";

// mock the sign out
const mockSignOut = jest.fn();

// mock the use media query hook
jest.mock("@/hooks/use-media-query", () => ({
  __esModule: true,
  default: jest.fn(() => true),
}));

// mock the use session hook
jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { accessToken: "mock-token" },
    status: "authenticated",
  }),
  signOut: jest.fn(() => mockSignOut()),
}));

// mock the avatar component
jest.mock("@/components/ui/avatar", () => {
  const Image = jest.requireActual("next/image").default;
  return {
    Avatar: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    AvatarImage: ({ src, alt }: { src: string; alt: string }) => (
      <Image src={src} alt={alt} width={40} height={40} />
    ),
    AvatarFallback: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
    AvatarSize: {
      small: "small",
    },
  };
});

// mock the dropdown menu component
jest.mock("@radix-ui/react-dropdown-menu", () => ({
  Root: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  Trigger: ({ children }: { children: React.ReactNode }) => (
    <button>{children}</button>
  ),
  Portal: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Content: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Item: ({
    children,
    onSelect,
  }: {
    children: React.ReactNode;
    onSelect?: () => void;
  }) => <div onClick={onSelect}>{children}</div>,
  Separator: () => <div />,
}));

// mock the user data
const userData = {
  id: 1,
  username: "testuser",
  email: "test@test.com",
};

/*
  @desc Test the profile dropdown
*/
describe("ProfileDropdown", () => {
  beforeEach(() => {
    mockSignOut.mockClear();
    jest.clearAllMocks();
  });

  test("should render correctly", () => {
    render(<ProfileDropdown userData={userData} />);

    expect(
      screen.getByRole("img", { name: "User's avatar" }),
    ).toBeInTheDocument();
  });

  test("should open the dropdown menu when clicked", async () => {
    render(<ProfileDropdown userData={userData} />);

    const avatarButton = screen.getByRole("img", { name: "User's avatar" });
    fireEvent.click(avatarButton);

    await waitFor(() => {
      expect(screen.getByText(/Mein Profil/i)).toBeInTheDocument();
      expect(screen.getByText(/Passwort ändern/i)).toBeInTheDocument();
      expect(screen.getByText(/Abmelden/i)).toBeInTheDocument();
    });
  });
});
