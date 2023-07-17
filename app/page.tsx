import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div className="space-y-5 bg-slate-900">
        <div className="p-5 text-center text-3xl font-semibold italic text-slate-400">
          Our Partners
        </div>
        <div className="p-28" />
      </div>
      <div className="space-y-5 bg-gradient-to-tr from-gray-900 to-gray-600 p-8">
        <div className="mb-20 flex flex-col-reverse md:flex-row">
          <div className="mx-auto flex w-[300px] p-5 text-center text-2xl font-bold text-white md:m-auto md:w-[500px] md:p-0 md:text-left md:text-7xl">
            One click to apply jobs
          </div>
        </div>

        <div className="mb-20 flex flex-col-reverse md:flex-row">
          <Card className="mx-auto flex w-[300px] flex-col justify-center space-y-8 rounded-xl border-0 bg-gradient-to-bl from-white to-slate-400 p-10 md:mx-10 md:w-[500px]">
            <blockquote className="text-center">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Vestibulum rhoncus aliquam suscipit. Suspendisse justo lectus,
              rutrum at viverra eget, sollicitudin vel enim. Etiam euismod
              bibendum feugiat. Vestibulum interdum tellus in velit maximus
              mattis.
            </blockquote>
            <Separator className="bg-slate-800" />
            <div className="flex flex-col items-center justify-between gap-3 md:flex-row">
              <div
                className="inline-flex h-20 w-20 
                items-center justify-center rounded-full 
                bg-white text-xl font-bold text-gray-700"
              />
              <div className="flex flex-col text-center align-baseline text-base md:text-right md:text-xl">
                <p>John Smith</p>
                <p className="text-slate-800">MCA Graduate, 2021-2023</p>
              </div>
            </div>
          </Card>
          <div className="mx-auto flex w-[300px] p-5 text-center text-2xl font-bold text-white md:m-auto md:w-[500px] md:p-0 md:text-right md:text-7xl">
            Hear what our students have to say
          </div>
        </div>
        <h2 className="mx-auto text-center text-3xl font-medium text-white md:mx-10 md:text-left">
          Featured Jobs
        </h2>
        <div className="mx-10 grid grid-cols-1 items-center gap-3 text-left align-top md:grid-cols-2">
          <Card className="flex flex-col space-y-5 border-slate-700 bg-slate-800  p-4 drop-shadow-sm">
            <div className="flex flex-grow space-x-4">
              <Image
                src="assets/profile.svg"
                width={36}
                height={36}
                alt="Profile photo"
                className="rounded-full border"
              />
              <div className="flex flex-col">
                <h5 className="font-medium text-white">Testmonial 1</h5>
                <h6 className="text-slate-300">some position</h6>
              </div>
            </div>
            <blockquote className="p-1 text-white">Lorem Ipsum</blockquote>
          </Card>
          <Card className="flex flex-col space-y-5 border-slate-700 bg-slate-800 p-4 drop-shadow-sm">
            <div className="flex flex-grow space-x-4">
              <Image
                src="assets/profile.svg"
                width={36}
                height={36}
                alt="Profile photo"
                className="rounded-full border"
              />
              <div className="flex flex-col">
                <h5 className="font-medium text-white">Testmonial 1</h5>
                <h6 className="text-slate-300">some position</h6>
              </div>
            </div>
            <p className="p-1 text-white">Lorem Ipsum</p>
          </Card>
          <Card className="flex flex-col space-y-5 border-slate-700 bg-slate-800 p-4 drop-shadow-sm">
            <div className="flex flex-grow space-x-4">
              <Image
                src="assets/profile.svg"
                width={36}
                height={36}
                alt="Profile photo"
                className="rounded-full border"
              />
              <div className="flex flex-col">
                <h5 className="font-medium text-white">Testmonial 1</h5>
                <h6 className="text-slate-300">some position</h6>
              </div>
            </div>
            <p className="p-1 text-white">Lorem Ipsum</p>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
