"use client";

import { Button, ButtonStyle } from "@/components/button/button";
import ProfileCard from "@/components/profile-card/profile-card";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Typography } from "@/components/ui/typography";

interface NavLinkProps {
  href: string;
  label: string;
}

const NavLink = ({ href, label }: NavLinkProps) => (
  <div className="w-full bg-sfred px-5 py-8">
    <Link href={href}>{label}</Link>
  </div>
);

const Dashboard = () => {
  const router = useRouter();
  const { toast } = useToast();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      setTimeout(() => {
        router.push("/session");
      }, 20000);
    },
  });

  if (status === "loading") {
    return (
      <div className="m-auto flex w-full items-center justify-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-sfblack" />
        <Typography variant="body">
          <p className="font-figtreeRegular text-sfblack">Laden...</p>
        </Typography>
      </div>
    );
  }

  if (status !== "authenticated") {
    return null;
  }

  const handleLogout = async () => {
    try {
      toast({
        variant: "default",
        title: "Abgemeldet",
        description: "Sie wurden erfolgreich abgemeldet.",
      });

      await new Promise((resolve) => setTimeout(resolve, 2000));
      await signOut({ redirect: true, callbackUrl: "/session" });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Abmeldung fehlgeschlagen. Bitte versuchen Sie es erneut.",
      });
      console.error("Logout failed: ", error);
    }
  };

  return (
    <div className="px-4 min-[640px]:px-8">
      <h1 className="sr-only">Dashboard</h1>
      <div className="flex flex-col items-center">
        <NavLink href="/create-recipe" label="neues Rezept erstellen" />
        <NavLink href="/my-recipes" label="meine Rezepte" />
        <ProfileCard />
        <Button
          style={ButtonStyle.OUTLINERED}
          label="abmelden"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
};

export default Dashboard;
