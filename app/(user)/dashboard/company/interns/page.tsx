import { getInterns } from "@/actions/jobs";
import InternCard from "@/components/jobApplication/internCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Intern } from "@/lib/validators/intern";

const InternshipPage = async () => {
  const interns = (await getInterns()) as Intern[];
  return (
    <div className="my-5 flex flex-col space-y-4">
      {interns.map((intern) => (
        <InternCard
          key={intern.internId}
          internId={intern.internId}
          internapp={intern.internapp}
          internappId={intern.internappId}
        />
      ))}
    </div>
  );
};

export default InternshipPage;
