import type { Job, Company } from "@prisma/client";

export type ExtendedJobPost = Job & {
  //likes: Likes[]
  company: Company;
  //comments: Comment[]
};
