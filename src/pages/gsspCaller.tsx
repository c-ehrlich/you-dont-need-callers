import { type InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { appRouter } from "../server/api/root";
import { fakePrisma } from "../server/db";

export const getServerSideProps = async () => {
  // would usually get id from url or something
  const id = 5;

  const caller = appRouter.createCaller({
    foo: "bar",
    fakePrisma,
  });

  const product = await caller.example2.getOneDiscounted({ id });

  return {
    props: {
      product,
    },
  };
};

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  return (
    <div>
      <Link href="/">Home</Link>
      <h1>getServerSideProps (caller)</h1>
      <h2>props</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
