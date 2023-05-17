import SignUpForm from "./components/SignUpForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SignUp() {
  return (
    <main className="w-full h-screen flex flex-col items-center justify-center bg-gray-50 sm:px-4">
      <div className="w-full space-y-6 text-gray-600 sm:max-w-md">
        <div className="text-center">
          <img
            src="https://floatui.com/logo.svg"
            width={150}
            className="mx-auto"
          />
          <div className="mt-5 space-y-2">
            <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
              Create an account
            </h3>
            <p className="">
              Already have an account?{" "}
              <a
                href="/signin"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Log in
              </a>
            </p>
          </div>
        </div>
        <Tabs defaultValue="student" className="w-full transition">
          <TabsList className="flex flex-row w-full gap-2">
            <TabsTrigger className="px-16" value="student">
              For Students
            </TabsTrigger>
            <TabsTrigger className="px-16" value="company">
              For Companies
            </TabsTrigger>
          </TabsList>
          <TabsContent value="student">
            <SignUpForm 
            name="Name" 
            emailName="Email" />
          </TabsContent>
          <TabsContent value="company">
            <SignUpForm 
            name="Name of Organization" 
            emailName="Company Email" />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
