import { verifiedUser } from "@/actions/user";
import DocumentUploadForm from "@/components/auth/DocUpload";
import { getUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";

const VerifyUserPage = async () => {
  const session = await getUser();
  const status = session?.user.status;
  const verified = await verifiedUser(session);

  if (!session) redirect("/");
  if (status === "Accepted")
    redirect(`dashboard/${session.user.role.toLowerCase()}`);
  return status === "Pending" ? (
    verified ? (
      <div className="my-auto w-fit items-center justify-center space-y-5 py-10 text-center md:m-3">
        <Image
          src="/assets/logo-light.svg"
          alt="Placement Cell Jmc"
          width={300}
          height={300}
        />

        <div className="text-left text-xl font-semibold md:text-3xl">
          Your verification is under <b>review</b>. Please visit the website
          after sometime. If the issue persists, please contact your
          administrator.
        </div>

        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-center text-base"
          )}
        >
          Back to Home
        </Link>
      </div>
    ) : (
      <div className="container relative hidden h-screen flex-col items-center justify-center divide-x-2 md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="relative hidden h-full flex-col bg-muted p-10 text-black lg:flex">
          <div className="absolute inset-0 bg-white" />
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "absolute left-4 top-4 md:left-8 md:top-8"
            )}
          >
            Back
          </Link>
          <div className="relative z-20 mt-auto flex items-center justify-center">
            <Image
              src="/assets/logo-light.svg"
              alt="Placement Cell Jmc"
              width={300}
              height={300}
            />
          </div>
          <div className="relative z-20 my-auto text-center">
            <h2 className="space-y-2 text-6xl font-bold">User Verification.</h2>
            <p>
              Please upload your college ID card or any identification document
              of your organization for verifying the your user profile
            </p>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
            <div className="flex flex-col space-y-2 text-center">
              <h1 className="text-2xl font-semibold tracking-tight">
                Upload Document
              </h1>
              <p className="text-sm text-muted-foreground">
                Choose file or drag file to below space..
              </p>
            </div>
            <DocumentUploadForm />
            <p className="px-8 text-center text-sm text-muted-foreground">
              By clicking continue, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>
    )
  ) : (
    status === "Rejected" && (
      <div className="mx-5 w-fit items-center justify-center gap-5 py-10 text-center text-xl font-semibold md:mx-10 md:text-3xl">
        <Image
          src="/assets/logo-light.svg"
          alt="Placement Cell Jmc"
          width={300}
          height={300}
        />

        <div className="my-5 text-left">
          Your user profile is being defected. If you did not expect this,
          please contact your administrator.
        </div>
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "ghost" }),
            "text-center text-base"
          )}
        >
          Back to Home
        </Link>
      </div>
    )
  );
};

export default VerifyUserPage;
