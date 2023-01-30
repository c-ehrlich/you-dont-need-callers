import { createTRPCRouter } from "../trpc";
import { getProductProcedure } from "./getProduct";
import { getDiscountedProductProcedure } from "./getDiscountedProduct";

export const exampleSplitFileRouter = createTRPCRouter({
  getOne: getProductProcedure,
  getOneDiscounted: getDiscountedProductProcedure,
});
