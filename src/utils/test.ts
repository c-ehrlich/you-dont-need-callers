import { describe, expect } from "vitest";
import { appRouter } from "../server/api/root";
import { createInnerTRPCContext } from "../server/api/trpc";

// This is a helper that can be used to make calls to the api when not logged in
export const createTestCaller = () => {
  return appRouter.createCaller(
    createInnerTRPCContext({
      // put a mocked session in here etc
    }),
  );
};

// Test the endpoints
describe("example", () => {
  describe("getOne", async () => {
    const publicCaller = createTestCaller();
    const data = await publicCaller.example2.getOneDiscounted({ id: 5 });
    expect(data.price).toBe(500);
  });

  describe("getOneDiscounted", async () => {
    const publicCaller = createTestCaller();
    const data = await publicCaller.example2.getOneDiscounted({ id: 5 });
    expect(data.price).toBe(250);
  });
});
