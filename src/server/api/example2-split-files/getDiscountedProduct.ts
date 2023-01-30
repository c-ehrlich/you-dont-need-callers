import { publicProcedure } from "../trpc";
import { getProduct, getProductInputSchema } from "./getProduct";

export const getDiscountedProductProcedure = publicProcedure
  .input(getProductInputSchema)
  .query(async ({ ctx, input }) => {
    const product = await getProduct({ fakePrisma: ctx.fakePrisma, input });
    return {
      ...product,
      price: product.price * 0.5,
    };
  });
