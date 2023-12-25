
import { tuple, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const equipmentRouter = createTRPCRouter({
    getEquipment: publicProcedure.query(({ ctx }) => {
        return ctx.db.equipment.findMany({
            include: {
                object: {
                    include: {
                            object: true
                    },
                }
            }
        });
    }),
});