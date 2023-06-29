import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="bg-slate-900 space-y-5">
        <div className="text-slate-400 text-3xl font-semibold italic text-center p-5">
          Our Partners
        </div>
        <div className="p-28" />
      </div>
      <div className="bg-gradient-to-tr from-gray-900 to-gray-600 p-8 space-y-5">
        <h2 className="text-white font-medium text-2xl mx-5">Testmonials</h2>
        <div className="grid md:grid-cols-3 grid-cols-1 gap-3 text-left align-top">
          <Card className="flex flex-col bg-slate-800 border-slate-700 drop-shadow-sm  p-4 space-y-5">
            <div className="flex flex-grow space-x-4">
              <Image
                src="assets/profile.svg"
                width={36}
                height={36}
                alt="Profile photo"
                className="rounded-full border"
              />
              <div className="flex flex-col">
                <h5 className="text-white font-medium">Testmonial 1</h5>
                <h6 className="text-slate-300">some position</h6>
              </div>
            </div>
            <blockquote className="text-white p-1">Lorem Ipsum</blockquote>
          </Card>
          <Card className="flex flex-col bg-slate-800 border-slate-700 drop-shadow-sm p-4 space-y-5">
            <div className="flex flex-grow space-x-4">
              <Image
                src="assets/profile.svg"
                width={36}
                height={36}
                alt="Profile photo"
                className="rounded-full border"
              />
              <div className="flex flex-col">
                <h5 className="text-white font-medium">Testmonial 1</h5>
                <h6 className="text-slate-300">some position</h6>
              </div>
            </div>
            <p className="text-white p-1">Lorem Ipsum</p>
          </Card>
          <Card className="flex flex-col bg-slate-800 border-slate-700 drop-shadow-sm p-4 space-y-5">
            <div className="flex flex-grow space-x-4">
              <Image
                src="assets/profile.svg"
                width={36}
                height={36}
                alt="Profile photo"
                className="rounded-full border"
              />
              <div className="flex flex-col">
                <h5 className="text-white font-medium">Testmonial 1</h5>
                <h6 className="text-slate-300">some position</h6>
              </div>
            </div>
            <p className="text-white p-1">Lorem Ipsum</p>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
