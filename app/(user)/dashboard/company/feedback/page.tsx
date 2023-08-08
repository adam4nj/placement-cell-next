import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import { getCompanyFeedback } from "@/actions/user";
import { Separator } from "@/components/ui/separator";
import { getUser } from "@/lib/auth";
import DeleteJobFeedbackButton from "@/components/deleteJobFeedbackButton";
import { StarFilledIcon } from "@radix-ui/react-icons";

const FeedbackPage = async () => {
  const session = await getUser();
  const feedbacks = await getCompanyFeedback(session?.user.id);
  return (
    <div className="container mx-auto w-full space-y-4 py-10">
      <div className="flex flex-col justify-between sm:flex-row">
        <span className="mb-5 text-2xl font-bold">Feedbacks</span>
      </div>
      <Separator className="my-5 bg-black" />

      <div className="grid grid-cols-1 gap-4 py-5">
        {!!feedbacks.length ? (
          feedbacks.map((data) => (
            <div className="flex flex-row space-x-3" key={data.id}>
              <Card className="w-full border border-slate-700 border-opacity-50">
                <CardHeader className="flex flex-col justify-between sm:flex-row">
                  <CardTitle>{data.job}</CardTitle>
                  <span className="text-sm opacity-60">
                    {dayjs(data.createdAt).format("DD/MM/YYYY")}
                  </span>
                </CardHeader>
                <CardContent className="text-sm">{data.feedback}</CardContent>
                <CardFooter className="text-sm">
                  {Array(data.rating).fill(<StarFilledIcon />)}
                </CardFooter>
              </Card>

              <div className="flex flex-col justify-evenly">
                <DeleteJobFeedbackButton id={data.id} />
              </div>
            </div>
          ))
        ) : (
          <div className="text-center align-middle text-2xl font-bold text-slate-500 opacity-40">
            There are no feedbacks available.
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackPage;
