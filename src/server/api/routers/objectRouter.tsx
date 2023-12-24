import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const objectRouter = createTRPCRouter({
    getObjects: publicProcedure.query(({ ctx }) => {
        return ctx.db.object.findMany({
         
        });
      }),
});