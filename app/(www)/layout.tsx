import Navbar from "@/components/Nav";
import { BackButton } from "@/components/backButton";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <div className="flex flex-col lg:flex-row lg:divide-x">
        <BackButton />
        <div className="container space-y-3 md:w-5/6 lg:w-3/4">{children}</div>
      </div>
    </>
  );
}
