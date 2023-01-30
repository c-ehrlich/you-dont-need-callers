import { type InferGetServerSidePropsType } from "next";
import Link from "next/link";
import { useState } from "react";
import { getProduct } from "../server/api/example2-split-files/getProduct";
import { fakePrisma } from "../server/db";
import { api } from "../utils/api";

export default function Page(
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) {
  const [id, setId] = useState(props.id);
  const { data } = api.example2.getOneDiscounted.useQuery(
    { id },
    {
      initialData: { foo: "bar" },
    },
  );

  return (
    <div>
      <Link href="/">Home</Link>
      <h1>getServerSideProps (function)</h1>
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
