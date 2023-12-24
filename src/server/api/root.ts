
import { object } from "zod";
import { createTRPCRouter } from "~/server/api/trpc";
import { objectRouter } from "./routers/objectRouter";

import { securityRouter } from "./routers/securityRouter";
import { timetableRouter } from "./routers/timetableRouter";
import { incidentRouter } from "./routers/incidentRouter";


/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
    object: objectRouter,
    security: securityRouter,
    timetable: timetableRouter,
    incident: incidentRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
