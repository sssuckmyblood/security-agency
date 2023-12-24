import { tuple, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const securityRouter = createTRPCRouter({
    getSecurity: publicProcedure.query(({ ctx }) => {
        return ctx.db.security.findMany({
                include:{
                    rank: true
                }
        });
      }),
    
    searchByFIO: publicProcedure
      .input(z.object({ value: z.string() }))
      .query(({ ctx, input }) => {
        return ctx.db.security.findMany({
          where: {
            OR: [
              {
                FIO: {
                  search: input.value.split(" ").join(" & "),
                },
              },
              {
                FIO: {
                  contains: input.value,
                },
              },
            ],
          },
          include:{
            rank: true
        }
        });
      }),
});