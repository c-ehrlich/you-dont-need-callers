import { exampleCallerRouter } from "./example0-problem/products";
import { exampleOneFileRouter } from "./example1-one-file/product";
import { exampleSplitFileRouter } from "./example2-split-files/_product";
import { createTRPCRouter } from "./trpc";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example0: exampleCallerRouter,
  example1: exampleOneFileRouter,
  example2: exampleSplitFileRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
