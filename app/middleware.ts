import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      if (req.nextUrl.pathname === "/dashboard/student") {
        return token?.role === "STUDENT";
      }
      if (req.nextUrl.pathname === "/dashboard/company") {
        return token?.role === "COMPANY";
      }
      if (req.nextUrl.pathname === "/dashboard/admin") {
        return token?.role === "ADMIN";
      }
      return !!token;
    },
  },
});

export const config = { matcher: ["/dashboard", "/verifyuser"] };
