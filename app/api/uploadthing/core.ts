import { z } from "zod";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { getStudent } from "@/actions/jobs";
import { NextResponse } from "next/server";

const f = createUploadthing();

export const ourFileRouter = {
  // Define as many FileRoutes as you like, each with a unique routeSlug
  profileimageUploader: f({ image: { maxFileSize: "4MB" } })
    // Set permissions and file types for this FileRoute
    .middleware(async () => {
      // This code runs on your server before upload
      const session = await getUser();

      // If you throw, the user will not be able to upload
      if (!session) throw new Error("Unauthorized");

      // Whatever is returned here is accessible in onUploadComplete as `metadata`
      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      await db.user.update({
        where: {
          id: metadata.userId,
        },
        data: {
          image: file.url,
        },
      });
    }),

  verifyDocUploader: f({
    pdf: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(async () => {
      const session = await getUser();

      if (!session) throw new Error("Unauthorized");

      return { userId: session.user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      // This code RUNS ON YOUR SERVER after upload

      await db.user.update({
        where: {
          id: metadata.userId,
        },
        data: {
          verifyDoc: file.url,
        },
      });
    }),

  pdfWithInput: f({
    pdf: { maxFileCount: 1, maxFileSize: "8MB" },
  })
    .input(z.object({ jobId: z.string() }))
    .middleware(async (opts) => {
      const student = await getStudent();

      return {
        jobId: opts.input.jobId,
        studentId: student?.studentId,
      };
    })
    .onUploadComplete(async (data) => {
      console.log("Upload complete", data);

      const job = await db.job.findUnique({
        where: {
          jobId: data.metadata.jobId,
        },
      });

      job?.type === "Internship"
        ? await db.internApplication.create({
            data: {
              jobId: data.metadata.jobId,
              studentId: data.metadata.studentId,
              resume: data.file.url,
              status: "Pending",
            },
          })
        : await db.jobApplication.create({
            data: {
              jobId: data.metadata.jobId,
              studentId: data.metadata.studentId,
              resume: data.file.url,
              status: "Pending",
            },
          });
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
