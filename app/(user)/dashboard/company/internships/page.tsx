import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const InternshipPage = () => {
  return (
    <div>
      <div className="p-10 border border-slate-700 border-opacity-70 rounded-xl space-y-5 drop-shadow-md">
        <span className="text-3xl font-bold">Current Interns</span>
        <Separator className="bg-black" />
        <Card className="p-5 space-y-4 border-slate-500">
          <CardTitle className="mx-5 text-lg">Employee</CardTitle>
          <CardContent>
            Job <br />
            Payment <br />
            Salary
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button>Pay Salary</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default InternshipPage;
