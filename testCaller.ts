import { appRouter } from "./src/server/api/root";
import { fakePrisma } from "./src/server/db";

const caller = appRouter.createCaller({ foo: "baz", fakePrisma });
caller.example
  .getProduct({ id: 100 })
  .then((res) => console.log(res))
  .catch((e) => console.log(e));
