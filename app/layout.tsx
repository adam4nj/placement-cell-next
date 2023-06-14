import Footer from "@/components/Footer";
import "./globals.css";
import Navbar from "@/components/Nav";
import AuthProvider from "./providers";

export const metadata = {
  title: "Placement Cell - JMC",
  description: "Placement Cell of Dr. John Mathai Centre",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col">
        <AuthProvider>
          <Navbar />
          {children}
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
