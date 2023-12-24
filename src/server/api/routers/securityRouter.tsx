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
});