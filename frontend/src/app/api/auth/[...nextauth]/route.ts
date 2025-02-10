import { authConfig } from "@/auth";
import NextAuth from "next-auth";

/*
  @desc Exports the NextAuth handler for each HTTP method (GET, POST, etc.)
*/
export const GET = NextAuth(authConfig);
export const POST = NextAuth(authConfig);
