import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ProfileDropdown from "./profile-dropdown";

const mockSignOut = jest.fn();

jest.mock("@/hooks/useMediaQuery", () => ({
  __esModule: true,
  default: jest.fn(() => true),
}));

jest.mock("next-auth/react", () => ({
  useSession: () => ({
    data: { accessToken: "mock-token" },
    status: "authenticated",
  }),
  signOut: jest.fn(() => mockSignOut()),
}));

jest.mock("@/components/avatar/avatar", () => ({
  Avatar: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  AvatarImage: ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  ),
  AvatarFallback: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
  AvatarSize: {
    small: "small",
  },
}));

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

describe("ProfileDropdown", () => {
  beforeEach(() => {
    mockSignOut.mockClear();
    jest.clearAllMocks();
  });

  test("should render correctly", () => {
    render(<ProfileDropdown />);

    expect(
      screen.getByRole("img", { name: "User's avatar" }),
    ).toBeInTheDocument();
  });

  test("should open the dropdown menu when clicked", async () => {
    render(<ProfileDropdown />);

    const avatarButton = screen.getByRole("img", { name: "User's avatar" });
    fireEvent.click(avatarButton);

    await waitFor(() => {
      expect(screen.getByText(/Mein Profil/i)).toBeInTheDocument();
      expect(screen.getByText(/Passwort ändern/i)).toBeInTheDocument();
      expect(screen.getByText(/Abmelden/i)).toBeInTheDocument();
    });
  });
});
