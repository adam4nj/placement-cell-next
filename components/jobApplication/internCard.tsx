"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Intern } from "@/lib/validators/intern";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { redirect, useRouter } from "next/navigation";

const InternCard = ({ internId, internappId, internapp }: Intern) => {
  const router = useRouter();
  const { mutate: payIntern } = useMutation({
    mutationFn: async () => {
      const payload: Intern = { internId, internappId, internapp };
      const { data } = await axios.post("/api/payments", payload);
      return data;
    },
    onSuccess: (data) => {
      router.push(data);
      return toast({
        title: "Payment is processed. Do not go back!",
      });
    },
    onError: () => {
      return toast({
        title: "Bad Connection",
        variant: "destructive",
      });
    },
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {internapp.student?.fName + " " + internapp.student?.lName}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col space-y-4 md:flex-row md:justify-between md:space-y-0">
        <div className="space-x-1">
          Role:
          <span className="font-semibold">{internapp.job.title}</span>
        </div>
        <Button onClick={() => payIntern()}>Pay Salary</Button>
      </CardContent>
    </Card>
  );
};

export default InternCard;
