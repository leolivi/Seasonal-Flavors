import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions, Session, SessionStrategy, User } from "next-auth";
import { JWT } from "next-auth/jwt";

/*
  @desc Authentication configuration
*/
export const authConfig: AuthOptions = {
  secret: process.env.AUTH_SECRET,
  session: {
    // using JWT as session strategy / management
    strategy: "jwt" as SessionStrategy,
  },
  pages: {
    // custom sign-in page
    signIn: "/auth/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // next-auth's default authorization method (no custom handleLogin)
      async authorize(credentials) {
        if (!credentials) return null;

        // if we have credentials, we can try to login
        // login logic is handled internally by NextAuth
        const response = await fetch(
          `${process.env.BACKEND_URL}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          },
        );

        const user = await response.json();

        // check if response is ok and user exists
        if (response.ok && user) {
          return {
            email: user.email,
            accessToken: user.token,
          } as User;
        }

        // if it doesn't work, return null
        return null;
      },
    }),
  ],
  callbacks: {
    // callback for JWT
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        // if user is logged in, add the token from the response to the user object
        token.accessToken = user.accessToken;
      }
      return token;
    },
    // callback for session
    async session({ session, token }: { session: Session; token: JWT }) {
      // if the user is logged in and a session is created for the user,
      // add the token from the response to the session object
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
};
