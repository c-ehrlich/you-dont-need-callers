import { createProxySSGHelpers } from "@trpc/react-query/ssg";
import { appRouter } from "../server/api/root";
import { createInnerTRPCContext } from "../server/api/trpc";
import superjson from "superjson";
import { type InferGetServerSidePropsType } from "next";
import { api } from "../utils/api";
import Link from "next/link";
import { useState } from "react";

export const getServerSideProps = async () => {
  // would usually get id from url or something
  const id = 5;

  const ssg = createProxySSGHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({}),
    transformer: superjson,
  });

  // `prefetch` does not return the result and never throws - if
  // you need that behavior, use `fetch` instead.
  await ssg.example2.getOneDiscounted.prefetch({ id });

  const product = await ssg.example2.getOneDiscounted.fetch({ id });
  console.log(product);

  return {
    props: {
      trpcState: ssg.dehydrate(),
      id,
    },
  };
};

export default function SSGHelpersPage(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [id, setId] = useState(props.id);
  const { data } = api.example2.getOneDiscounted.useQuery({ id });

  return (
    <div>
      <Link href="/">Home</Link>
      <h1>getServerSideProps (ssghelper)</h1>
      <input
        type="number"
        value={id}
        onChange={(e) => setId(Number(e.target.value))}
      />
      <h2>data</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <div>Loading...</div>
      )}
      <h2>props</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
