import { tuple, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const timetableRouter = createTRPCRouter({
    getTimetable: publicProcedure.query(({ ctx }) => {
        return ctx.db.timetable.findMany({
              include:{
                security: true,
                object: true
              }
        });
      }),
});