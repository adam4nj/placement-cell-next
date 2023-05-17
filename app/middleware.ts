import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

export const runtime = 'nodejs';

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};