import { router } from "./trpc";
import { z } from "zod";

import { publicProcedure } from "./trpc";

export const jobRouter = router({
  findAllJobs: publicProcedure.query(
    async ({ ctx }) => await ctx.db.job.findMany()
  ),
  insertJobs: publicProcedure.input(z.object({ title: z.string() })).mutation(
    async ({ input, ctx }) =>
      await ctx.db.job.create({
        data: { title: input.title },
      })
  ),
  updateJobs: publicProcedure
    .input(z.object({ id: z.string(), title: z.string() }))
    .mutation(
      async ({ input, ctx }) =>
        await ctx.db.job.update({
          where: { id: input.id },
          data: { title: input.title },
        })
      //not finished
    ),
  deleteJobs: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return await ctx.db.job.deleteMany({
        where: {
          id: input.id,
        },
      });
    }),
});

export type JobRouter = typeof jobRouter;
