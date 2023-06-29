import Navbar from "@/components/Nav";

export default function WebLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="sticky top-0 flex bg-white drop-shadow">
        <Navbar />
      </div>
      <div className="flex flex-col lg:divide-x lg:flex-row">
        <div className="container md:w-5/6 lg:w-3/4 space-y-3">{children}</div>
      </div>
    </>
  );
}
