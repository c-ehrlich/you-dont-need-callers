import { TRPCError } from "@trpc/server";
import z from "zod";
import { appRouter } from "../root";
import { createTRPCRouter, publicProcedure } from "../trpc";

const getProductInputSchema = z.object({ id: z.number() });

export const exampleCallerRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(getProductInputSchema)
    .query(async ({ ctx, input }) => {
      const product = await ctx.fakePrisma.getProductById(input.id);
      if (product.id === 69) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Nice but no" });
      }
      return product;
    }),

  getOneDiscounted: publicProcedure
    .input(getProductInputSchema)
    .query(async ({ ctx, input }) => {
      /**
       * we want to:
       * - call `getOne` with input
       * - halve the price
       * - return the product
       */
      // const caller = appRouter.createCaller({
      //   foo: "bar",
      //   fakePrisma,
      // });
      // const product = await caller.example0.getOne(input);
      // return product;
    }),
});
