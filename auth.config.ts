import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcrypt from "bcryptjs";
import { getUserByEmail } from "./lib/data";

// Notice this is only an object, not a full Auth.js instance
export default {
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized: async ({ request, auth }) => {
      return !!auth;
    },
  },
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },

      authorize: async (credentials) => {
        let user = null;

        user = await getUserByEmail(credentials.email as string);
        const hashedPassword = bcrypt.hashSync(
          credentials.password as string,
          10
        );

        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          hashedPassword
        );

        if (!isPasswordValid) return null;

        return user;
      },
    }),
  ],
} satisfies NextAuthConfig;
