"use client";
import { signOut, useSession } from "next-auth/react";

const Dashboard = () => {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // The user is not authenticated, handle it here.
    },
  });

  const handleLogout = async () => {
    console.log("logged out?");
    await signOut({ redirect: true, callbackUrl: "/session" });
    // window.location.reload();
    console.log("logged out");
  };

  if (status === "loading") {
    return "Loading or not authenticated...";
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Weitere Dashboard-Inhalte */}
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
