import { TRPCError } from "@trpc/server";
import { publicProcedure } from "../trpc";
import { z } from "zod";
import { type FakePrismaClient } from "../../db";

export const getProductInputSchema = z.object({ id: z.number() });
type GetProductInput = z.infer<typeof getProductInputSchema>;

export async function getProduct({
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

export const getProductProcedure = publicProcedure
  .input(getProductInputSchema)
  .query(({ ctx, input }) => {
    return getProduct({ fakePrisma: ctx.fakePrisma, input });
  });
