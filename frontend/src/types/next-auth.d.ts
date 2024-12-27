import "next-auth";
import "@auth/core/jwt";

declare module "next-auth" {
  interface Session {
    user?: {
      id: number;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    accessToken?: string;
  }

  interface User {
    accessToken: string;
    email: string;
  }
}

declare module "@auth/core/jwt" {
  interface JWT {
    accessToken: string;
  }
}
