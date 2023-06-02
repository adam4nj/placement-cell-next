import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import JobCard, { Job } from "@/components/jobCard";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

const InternshipPage = async () => {
  const internships = [
    {
      id: "1",
      title: "title 1",
      details: "details 1",
      location: "location 1",
      createdAt: "Posted 1 day ago",
    },
    {
      id: "2",
      title: "title 2",
      details: "details 2",
      location: "location 2",
      createdAt: "Posted 2 days ago",
    },
    {
      id: "2",
      title: "title 2",
      details: "details 2",
      location: "location 2",
      createdAt: "Posted 2 days ago",
    },
    {
      id: "2",
      title: "title 2",
      details: "details 2",
      location: "location 2",
      createdAt: "Posted 2 days ago",
    },
    {
      id: "2",
      title: "title 2",
      details: "details 2",
      location: "location 2",
      createdAt: "Posted 2 days ago",
    },
    {
      id: "2",
      title: "title 2",
      details: "details 2",
      location: "location 2",
      createdAt: "Posted 2 days ago",
    },
  ];
  //const internships = await db.job.findMany();
  const session = await getServerSession(authOptions);

  if (!session) redirect("/api/auth/signin");

  return (
    <>
      {JSON.stringify(session)}
      <div className="flex flex-col lg:divide-x lg:flex-row">
        <div className="container md:w-5/6 lg:w-3/4 space-y-3">
          <div className="text-3xl p-3 text-start">Internships</div>
          {internships.length ? (
            <ul className="grid grid-rows-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {internships.map((job) => (
                <JobCard
                  id={job.id}
                  title={job.title}
                  details={job.details}
                  location={job.location}
                  createdAt={job.createdAt}
                />
              ))}
            </ul>
          ) : (
            <p> your internship list is empty</p>
          )}
        </div>

        <div className="container sm:w-[600px] md:w-[700px] lg:w-1/4 space-y-3">
          <div className="text-2xl px-1 mt-4">Notifications</div>
          <Separator />
          <Card className="flex flex-col items-center p-2 space-y-3">
            <div className="ml-2 space-y-1">
              <div className="flex flex-row justify-between">
                <p className="text-sm text-left font-medium">Notification 1</p>
                <p className="text-sm font-light">1 day ago</p>
              </div>
              <p className="text-sm text-muted-foreground">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </p>
            </div>
            <div className="ml-2 space-y-1">
              <div className="flex flex-row justify-between">
                <p className="text-sm text-left font-medium">Notification 1</p>
                <p className="text-sm font-light">1 day ago</p>
              </div>
              <p className="text-sm text-muted-foreground">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
              </p>
            </div>
            {/* Repeat upto this div */}
          </Card>
        </div>
      </div>
    </>
  );
};

export default InternshipPage;
