import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Typography } from "@/components/ui/typography";

export const SessionLoader = () => (
  <div className="m-auto flex w-full items-center justify-center gap-4 py-20">
    <Loader2 className="h-12 w-12 animate-spin text-sfblack" />
    <Typography variant="body">
      <p className="font-figtreeRegular text-sfblack">Laden...</p>
    </Typography>
  </div>
);

interface AuthSessionProps {
  children: React.ReactNode;
}

export const AuthSession = ({ children }: AuthSessionProps) => {
  const { status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return <SessionLoader />;
  }

  if (status !== "authenticated") {
    router.push("/session");
    return null;
  }

  return <>{children}</>;
};
