import { type NextPage } from "next";
import Link from "next/link";

import { api } from "../utils/api";

const Home: NextPage = () => {
  const { data } = api.example2.getOneDiscounted.useQuery({ id: 5 });

  return (
    <div>
      <h1>Querying on the client</h1>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div>Loading...</div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <Link href="/gsspCaller">gsspCaller</Link>
        <Link href="/gsspFunction">gsspFunction</Link>
        <Link href="/gsspFunctionInitialData">gsspFunctionInitialData</Link>
        <Link href="/gsspSSGHelpers">gsspSSGHelpers</Link>
      </div>
    </div>
  );
};

export default Home;
