// import type { NextAuthConfig } from "next-auth";
// import { DefaultSession } from "next-auth";

// declare module "next-auth" {
//   interface Session extends DefaultSession {
//     user: {
//       id: string;
//       isDoctor: boolean;
//       appointments: string[];
//     } & DefaultSession["user"];
//   }

//   interface User {
//     id: string;
//     isDoctor: boolean;
//     appointments?: string[]; // Optional in User as it might come from DB
//   }

//   interface JWT {
//     sub?: string;
//     id?: string;
//     isDoctor?: boolean;
//     appointments?: string[];
//   }
// }

// export const authConfig: NextAuthConfig = {
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async session({ session, token }) {
//       if (session.user) {
//         const userId =
//           typeof token.sub === "string"
//             ? token.sub
//             : typeof token.id === "string"
//             ? token.id
//             : "";

//         const isDoctor =
//           typeof token.isDoctor === "boolean" ? token.isDoctor : false;

//         const appointments = Array.isArray(token.appointments)
//           ? token.appointments
//           : [];

//         session.user.id = userId;
//         session.user.isDoctor = isDoctor;
//         session.user.appointments = appointments;
//       }
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.id = user.id;
//         token.isDoctor = user.isDoctor;
//         token.appointments = user.appointments || [];
//       }
//       return token;
//     },
//     authorized({ auth, request: { nextUrl } }) {
//       const isLoggedIn = !!auth?.user;
//       const user = auth?.user;

//       const isOnDashboard =
//         nextUrl.pathname.startsWith("/patient") ||
//         nextUrl.pathname.startsWith("/account") ||
//         nextUrl.pathname.startsWith("/doctor");
//       if (isOnDashboard) {
//         if (isLoggedIn) return true;
//         return false;
//       } else if (isLoggedIn) {
//         if (user?.isDoctor)
//           return Response.redirect(new URL("/doctor", nextUrl));
//         return Response.redirect(new URL("/patient", nextUrl));
//       }
//       return true;
//     },
//   },
//   providers: [],
//   session: {
//     strategy: "jwt",
//   },
// };
import type { NextAuthConfig } from "next-auth";
import { DefaultSession } from "next-auth";
import { Appointment } from "./lib/definitions";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      isDoctor: boolean;
      appointments: Appointment[];
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    isDoctor: boolean;
    appointments?: Appointment[]; // Optional in User as it might come from DB
  }

  interface JWT {
    sub?: string;
    id?: string;
    isDoctor?: boolean;
    appointments?: Appointment[];
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

        // Validate and normalize appointments array
        const appointments = (
          Array.isArray(token.appointments) ? token.appointments : []
        ).map((appt) => ({
          name: typeof appt.name === "string" ? appt.name : "",
          appointment_time:
            appt.appointment_time instanceof Date
              ? appt.appointment_time
              : new Date(appt.appointment_time || Date.now()),
        }));

        session.user.id = userId;
        session.user.isDoctor = isDoctor;
        session.user.appointments = appointments;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.isDoctor = user.isDoctor;
        // Normalize appointments when storing in token
        token.appointments = (user.appointments || []).map((appt) => ({
          name: appt.name,
          appointment_time:
            appt.appointment_time instanceof Date
              ? appt.appointment_time.toISOString()
              : appt.appointment_time,
        }));
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