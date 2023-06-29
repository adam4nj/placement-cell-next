import "./globals.css";
import { League_Spartan } from "next/font/google";
import QueryProvider from "./providers";
("./providers");
import { twMerge } from "tailwind-merge";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "Placement Cell - JMC",
  description: "Placement Cell of Dr. John Mathai Centre",
};

const leagueSpartan = League_Spartan({
  style: "normal",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={twMerge("flex flex-col", leagueSpartan.className)}>
        <QueryProvider>{children}</QueryProvider>
        <Toaster />
      </body>
    </html>
  );
}
