import Navbar from "@/components/Nav";
import { BackButton } from "@/components/backButton";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:divide-x lg:flex-row">
        <BackButton />
        <div className="container md:w-5/6 lg:w-3/4 space-y-3">{children}</div>
      </div>
    </>
  );
}
