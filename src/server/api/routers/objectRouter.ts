import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const objectRouter = createTRPCRouter({
  getObjects: publicProcedure.query(({ ctx }) => {
    return ctx.db.object.findMany({
      include: {
        timetable: {
          include: {
            security: {
              include: {
                rank: true,
              },
            },
          },
        },

        equipment: {
          include: {
            equipment: true,
          },
        },
        incident: true,
      },
    });
  }),
  searchByName: publicProcedure
    .input(z.object({ value: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.object.findMany({
        where: {
          OR: [
            {
              name: {
                search: input.value.split(" ").join(" & "),
              },
            },
            {
              name: {
                contains: input.value,
              },
            },
          ],
        },
        include: {
          timetable: {
            include: {
              security: {
                include: {
                  rank: true,
                },
              },
            },
          },
          equipment: {
            include: {
              equipment: true,
            },
          },
        },
      });
    }),

  searchByAddress: publicProcedure
    .input(z.object({ value: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.db.object.findMany({
        where: {
          OR: [
            {
              address: {
                search: input.value.split(" ").join(" & "),
              },
            },
            {
              address: {
                contains: input.value,
              },
            },
          ],
        },
        include: {
          timetable: {
            include: {
              security: {
                include: {
                  rank: true,
                },
              },
            },
          },
          equipment: {
            include: {
              equipment: true,
            },
          },
        },
      });
    }),
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.object.create({
        data: {
          name: input.name,
          address: input.address,
          description: input.description,
        },
      });
    }),
    delete: publicProcedure
    .input(
      z.object({
        id: z.number(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.object.delete({
        where:{
          id: input.id
        }
      });
    
    }),
});
