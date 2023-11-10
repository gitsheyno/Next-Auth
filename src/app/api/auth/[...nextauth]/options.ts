import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Your-cool-username",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Your-cool-password",
        },
      },
      async authorize(credentials) {
        //Getting data from database

        const user = { id: "42", name: "Dave", password: "nextauth" };

        if (
          credentials?.username === user.name &&
          credentials?.password === user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        console.log("user", user);
        token.image = "https://avatars.githubusercontent.com/u/107813515?v=4";
        console.log("tokennn", token);
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.image = token.image as string;
      }

      return session;
    },
  },
};
