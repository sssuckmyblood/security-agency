
import { tuple, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const incidentRouter = createTRPCRouter({
    getIncident: publicProcedure.query(({ ctx }) => {
        return ctx.db.incident.findMany({
           include:{
            object: true,
            security: true,
           }
        });
      }),
});