import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import dayjs from "dayjs";
import { getFeedback } from "@/actions/user";
import DeleteFeedbackButton from "@/components/deleteFeedbackButton";

const FeedbackPage = async () => {
  const feedbacks = await getFeedback();
  return (
    <div className="container w-full mx-auto py-10 space-y-4">
      <div className="flex sm:flex-row flex-col justify-between">
        <span className="text-2xl font-semibold mb-5">Feedbacks</span>
      </div>
      <div className="grid grid-cols-1 gap-4 py-5">
        {feedbacks.map((data) => (
          <div className="flex flex-row space-x-3" key={data.id}>
            <Card className="w-full border border-slate-700 border-opacity-50">
              <CardHeader className="flex flex-col sm:flex-row justify-between">
                <CardTitle>{data.subject}</CardTitle>
                <span className="text-sm opacity-60">
                  {dayjs(data.createdAt).format("DD/MM/YYYY")}
                </span>
              </CardHeader>
              <CardContent className="text-sm">{data.feedback}</CardContent>
              <CardFooter className="text-sm">{data.rating}</CardFooter>
            </Card>

            <div className="flex flex-col justify-evenly">
              <DeleteFeedbackButton id={data.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeedbackPage;
