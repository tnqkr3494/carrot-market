import type { NextPage } from "next";
import FloatingButton from "../components/floating-button";
import Item from "../components/item";
import Layout from "../components/layout";
import useUser from "@/libs/client/useUser";
import useSWR, { SWRConfig } from "swr";
import { Product, Purchase, Review } from "@prisma/client";
import client from "@/libs/server/client";
import { useState } from "react";
import Modal from "@/components/modal-portal";

export interface ProductWithCount extends Product {
  _count: {
    Fav: number;
  };
  Purchase: Purchase[];
  Review: Review[];
}

interface ProductsResponse {
  ok: boolean;
  products: ProductWithCount[];
}

const Home: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data } = useSWR<ProductsResponse>("/api/products");
  return (
    <>
      <Layout title="홈" hasTabBar>
        <div className="flex flex-col divide-y">
          {data?.products?.map((product) =>
            product.Purchase?.length === 0 ? (
              <Item
                id={product.id}
                key={product.id}
                title={product.name}
                price={product.price}
                hearts={product._count?.Fav || 0}
              />
            ) : null,
          )}
          <FloatingButton href="/products/upload">
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </FloatingButton>
        </div>
      </Layout>
      <button onClick={() => setIsModalOpen(true)}>모달 열기</button>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="text-center">나는 인간이다</div>
      </Modal>
    </>
  );
};

const Page: NextPage<{ products: Product[] }> = ({ products }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/products": {
            ok: true,
            products,
          },
        },
      }}
    >
      <Home />
    </SWRConfig>
  );
};
//swr과 ssr을 같이 쓰려고 swrconfig를 이용함.

export async function getServerSideProps() {
  console.log("ssr");
  const products = await client.product.findMany({});
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)), //Date.now()함수에 값으로 들어온 내용을 인식을 못해서 한 변환과정
    },
  };
}

export default Page;
