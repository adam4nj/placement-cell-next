import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";

export default function RegisterLayout(props: {
  student: React.ReactNode;
  company: React.ReactNode;
}) {
  return (
    <div className="h-full bg-[url('/assets/authbg.jpg')] bg-cover bg-center opacity-95 bg-blend-darken">
      <Tabs
        defaultValue="student"
        className="my-[33px] flex h-full flex-col p-5 transition-all md:flex-row md:space-x-6"
      >
        <div className="flex flex-col items-center justify-evenly space-y-4 py-5 md:space-y-0 md:p-10">
          <img src="assets/logo-dark.svg" className="my-4 w-40" />

          <TabsList className="flex flex-col bg-transparent text-xl text-white transition-all duration-700 md:my-0">
            <TabsTrigger
              value="student"
              className="px-10 text-xl data-[state=active]:bg-white"
            >
              Apply as Student
            </TabsTrigger>
            <TabsTrigger
              value="company"
              className="px-10 text-xl data-[state=active]:bg-white"
            >
              Apply as Company
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="student">{props.student}</TabsContent>
        <TabsContent value="company">{props.company}</TabsContent>
      </Tabs>
    </div>
  );
}
