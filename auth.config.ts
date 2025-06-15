// import type { NextAuthConfig } from "next-auth";

// declare module "next-auth" {
//   interface Session {
//     user: {
//       name?: string | null;
//       email?: string | null;
//       image?: string | null;
//       id: string;
//       isDoctor: boolean;
//     };
//   }

//   interface User {
//     id: string;
//     isDoctor: boolean;
//   }
// }

// export const authConfig = {
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async session({ session, token, user }) {
//       if (session.user) {
//         session.user.id = token.sub || user.id;
//         session.user.isDoctor = token.isDoctor || user.isDoctor;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.sub = user.id;
//         token.isDoctor = user.isDoctor;
//       }
//       return token;
//     },
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const user = auth?.user;
//       console.log(user);

//       const isOnDashboard =
//         nextUrl.pathname.startsWith("/patient") ||
//         nextUrl.pathname.startsWith("/account") ||
//         nextUrl.pathname.startsWith("/doctor");
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false;
//       } else if (isLoggedIn) {
//         return Response.redirect(new URL("/patient", nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [],
// } satisfies NextAuthConfig;
import type { NextAuthConfig } from "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isDoctor: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    isDoctor: boolean;
  }

  interface JWT {
    sub?: string;
    id?: string;
    isDoctor?: boolean;
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        const userId =
          typeof token.sub === "string"
            ? token.sub
            : typeof token.id === "string"
            ? token.id
            : "";

        const isDoctor =
          typeof token.isDoctor === "boolean" ? token.isDoctor : false;

        session.user.id = userId;
        session.user.isDoctor = isDoctor;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isDoctor = user.isDoctor;
      }
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const user = auth?.user;

      const isOnDashboard =
        nextUrl.pathname.startsWith("/patient") ||
        nextUrl.pathname.startsWith("/account") ||
        nextUrl.pathname.startsWith("/doctor");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        if (user?.isDoctor)
          return Response.redirect(new URL("/doctor", nextUrl));
        return Response.redirect(new URL("/patient", nextUrl));
      }
      return true;
    },
  },
  providers: [],
  session: {
    strategy: "jwt",
  },
};
