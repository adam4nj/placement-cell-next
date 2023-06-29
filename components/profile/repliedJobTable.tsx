import { getStudentJobs } from "@/actions/jobs";
import { getUser } from "@/lib/auth";
import { z } from "zod";
import { DataTable } from "../dataTable";

export const RepliedJobs = async () => {
  const getData = async () => {
    const session = await getUser();
    if (session) {
      const jobs = await getStudentJobs(session.user.id);
      return jobs;
    }
  };

  const data = await getData();
};
