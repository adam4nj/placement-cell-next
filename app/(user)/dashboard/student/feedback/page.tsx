import { FeedbackForm } from "@/components/feedbackForm";
import { getUser } from "@/lib/auth";
import { notFound } from "next/navigation";

const StudentFeedBackPage = async () => {
  const session = await getUser();
  if (session)
    return (
      <div className="mx-5 my-10 sm:m-10 space-y-5">
        <FeedbackForm userId={session.user.id} />
      </div>
    );
  return notFound();
};

export default StudentFeedBackPage;
