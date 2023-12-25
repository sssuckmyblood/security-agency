import { tuple, z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const equipmentRouter = createTRPCRouter({
  getEquipment: publicProcedure.query(({ ctx }) => {
    return ctx.db.equipment.findMany({
      include: {
        object: {
          include: {
            object: true,
          },
        },
      },
    });
  }),

  create: publicProcedure
    .input(
      z.object({
        type: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.equipment.create({
        data: {
          type: input.type,
        },
      });
    }),
  createObject: publicProcedure
    .input(
      z.object({
        object: z.array(
          z.object({
            objectId: z.number(),
            equipmentId: z.number(),
            placement: z.string(),
            status: z.string(),
          }),
        ),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.linkEquipmentObject.createMany({
        data: input.object,
      });
    }),

    delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.linkEquipmentObject.deleteMany({
        where:{
          equipmentId: input.id
        }
      });
    
    }),
});
