import { TRPCError } from "@trpc/server";
import z from "zod";
import { type FakePrismaClient } from "../../db";
import { createTRPCRouter, publicProcedure } from "../trpc";

const getProductInputSchema = z.object({ id: z.number() });
type GetProductInput = z.infer<typeof getProductInputSchema>;

async function getProduct({
  fakePrisma,
  input,
}: {
  fakePrisma: FakePrismaClient; // `PrismaClient` in a real app
  input: GetProductInput;
}) {
  const product = await fakePrisma.getProductById(input.id);
  if (product.id === 69) {
    throw new TRPCError({ code: "UNAUTHORIZED", message: "Nice but no" });
  }
  return product;
}

export const exampleExtractedFunctionRouter = createTRPCRouter({
  getOne: publicProcedure
    .input(getProductInputSchema)
    .query(({ ctx, input }) => {
      return getProduct({ fakePrisma: ctx.fakePrisma, input });
    }),

  getOneDiscounted: publicProcedure
    .input(getProductInputSchema)
    .query(async ({ ctx, input }) => {
      const product = await getProduct({ fakePrisma: ctx.fakePrisma, input });
      const discountedProduct = {
        ...product,
        price: product.price / 2,
      };
      return discountedProduct;
    }),
});
