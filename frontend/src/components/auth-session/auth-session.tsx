"use client";

import { motion } from "framer-motion";
import { Typography } from "@/components/ui/typography";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import SeasonalFlavorsBrandmark from "@/assets/logo/seasonal-flavors-brandmark.svg";

interface SessionLoaderProps {
  size?: "small" | "medium";
}

/*
  @desc Displays the session loader
*/
export const SessionLoader = ({ size = "medium" }: SessionLoaderProps) => {
  const brandmarkSize =
    size === "small"
      ? "h-6 w-6 min-[640px]:h-10 min-[640px]:w-10"
      : "h-24 w-24";

  // return the session loader
  return (
    <div
      className={`flex ${size === "small" ? "flex-row items-center justify-center gap-2" : "fixed inset-0 flex-col items-center justify-center gap-4"}`}
    >
      {/* brandmark */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={brandmarkSize}
      >
        <SeasonalFlavorsBrandmark className="brandmark" />
      </motion.div>
      {/* loading text */}
      <Typography variant="body">
        <p className={`font-figtreeRegular text-sfblack`}>Laden...</p>
      </Typography>
    </div>
  );
};

interface AuthSessionProps {
  children: React.ReactNode;
}

/*
  @return array|Response
  @desc Wraps the children in an auth session
*/
export const AuthSession = ({ children }: AuthSessionProps) => {
  const { status } = useSession();
  const router = useRouter();

  // if the session is loading, return the session loader
  if (status === "loading") {
    return <SessionLoader />;
  }

  // if the session is not authenticated, redirect to the session page
  if (status !== "authenticated") {
    router.push("/session");
    return null;
  }

  // return the children
  return <>{children}</>;
};
