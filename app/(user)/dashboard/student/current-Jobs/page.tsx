import { Card } from "@/components/ui/card";
import {
  getAcceptedInternships,
  getCurrentIntern,
  isIntern,
} from "@/actions/jobs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { AcceptOfferDialog } from "@/components/acceptOffer";
import { Suspense } from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const JobOfferPage = async () => {
  const jobs = await getAcceptedInternships();
  const myJob = await getCurrentIntern();
  const intern = await isIntern();
  return (
    <div className="m-5 space-y-4">
      <div className="flex flex-row justify-between">
        <h2 className="text-2xl font-bold">Your Current Jobs</h2>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost">View Accepted Internships</Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Accepted Intern Positions</SheetTitle>
              <SheetDescription>
                Choose your job offers as given below
              </SheetDescription>
            </SheetHeader>
            <ScrollArea>
              <Alert className="my-5 border-black">
                <Info className="mt-1 h-5 w-5" />
                <AlertTitle className="text-lg font-extrabold">Note</AlertTitle>
                <AlertDescription>
                  Please carefully review all aspects of your available job
                  offers and thoughtfully proceed with the most suitable job
                  offer.
                </AlertDescription>
              </Alert>
              <ul className="grid grid-rows-1 gap-2">
                {jobs.map((job) => (
                  <li key={job.jobId}>
                    <Card className="flex flex-col space-y-5 bg-gradient-to-r from-sky-950 to-sky-900 p-8 text-white drop-shadow-md">
                      <div className="text-3xl font-bold">{job.job.title}</div>
                      <div className="flex flex-row justify-between">
                        <span>{job.job.company.companyName}</span>{" "}
                        <span>₹{job.job.salary}</span>
                      </div>
                      {!intern ? (
                        <Suspense fallback="loading">
                          <AcceptOfferDialog id={job.internAppId} />
                        </Suspense>
                      ) : (
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button className="bg-slate-300 text-black hover:bg-slate-200">
                                Accept Job Offer
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="flex w-[250px]">
                              <p>
                                You are now currently an intern for a company.
                                You can only accept new job offers after
                                finishing your tenure.
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      )}
                    </Card>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      </div>
      <section className="rounded-xl border-2 border-black bg-white p-5 drop-shadow-md">
        <div className="space-y-4">
          <h2 className="text-3xl font-extrabold">
            {myJob?.internapp.job.title}
          </h2>
          <h4 className="text-lg font-bold">
            {myJob?.internapp.job.company.companyName}
          </h4>
          <div className="font-bold">
            Offered Salary : ₹{myJob?.internapp.job.salary}
          </div>
        </div>
        <div className="flex flex-row justify-end space-x-2 font-semibold">
          <p>Currently Paid:,</p>
          <p>Balance:</p>
        </div>
      </section>
    </div>
  );
};

export default JobOfferPage;
