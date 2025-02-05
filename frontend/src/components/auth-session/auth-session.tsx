import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Typography } from "@/components/ui/typography";
import { motion } from "framer-motion";
import SeasonalFlavorsBrandmark from "../../assets/logo/seasonal-flavors-brandmark.svg";

interface SessionLoaderProps {
  size?: "small" | "medium";
}

export const SessionLoader = ({ size = "medium" }: SessionLoaderProps) => {
  const brandmarkSize =
    size === "small"
      ? "h-6 w-6 min-[640px]:h-10 min-[640px]:w-10"
      : "h-24 w-24";

  return (
    <div
      className={`flex ${size === "small" ? "flex-row items-center justify-center gap-2" : "fixed inset-0 flex-col items-center justify-center gap-4"}`}
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={brandmarkSize}
      >
        <SeasonalFlavorsBrandmark className="brandmark" />
      </motion.div>
      <Typography variant="body">
        <p className={`font-figtreeRegular text-sfblack`}>Laden...</p>
      </Typography>
    </div>
  );
};

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
