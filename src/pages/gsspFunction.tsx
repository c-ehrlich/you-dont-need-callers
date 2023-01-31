import { type InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { getProduct } from "../server/api/example2-split-files/getProduct";
import { fakePrisma } from "../server/db";

export const getServerSideProps = async () => {
  // would usually get id from url or something
  const id = 5;

  const product = await getProduct({ fakePrisma, input: { id } });

  return {
    props: {
      id,
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
      <h1>getServerSideProps (function)</h1>
      <h2>props</h2>
      <pre>{JSON.stringify(props, null, 2)}</pre>
    </div>
  );
}
