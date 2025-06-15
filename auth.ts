import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import { z } from "zod";
import type { MyUser } from "@/lib/definitions";
import clientPromise from "./lib/db";
// import bcrypt from "bcrypt";

async function getUser(email: string): Promise<MyUser | undefined> {
  try {
    const client = await clientPromise;
    const db = client.db("doccheck");
    const collection = db.collection<MyUser>("users");
    const user = await collection.findOne({ email: email });
    return user ?? undefined;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;

          const passwordsMatch = password === user.password;
          // const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch)
            return {
              id: user._id.toString(),
              name: user.name,
              email: user.email,
              isDoctor: user.isDoctor,
            };
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
