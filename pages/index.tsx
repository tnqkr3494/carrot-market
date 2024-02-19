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
  const [page, setPage] = useState(1);
  const { data } = useSWR<ProductsResponse>(`/api/products?page=${page}`);
  const onPageClick = (num: number) => {
    setPage(num);
  };
  return (
    <>
      <Layout title="홈" hasTabBar>
        <div className="flex flex-col divide-y">
          {data?.products?.map((product) =>
            // 이미 팔린 물건인지 확인하는 작업은 백엔드에서 해야겠다(take에서 가져오는데 그 가져오는 것들 중 팔린물건이 있으면
            // 예를들어 5개를 가져왔는데 5개가 페이지에 보여질 줄 알았지만 3개가 팔린물건이면 2개만 보여서 pagination하기 힘들어짐.
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
          <div className="flex items-center justify-center space-x-2 pt-3">
            {[1, 2, 3].map((num) => (
              <button
                onClick={() => onPageClick(num)}
                key={num}
                className="h-10 w-10 rounded-md bg-orange-500"
              >
                {num}
              </button>
            ))}
          </div>
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
  const products = await client.product.findMany({
    take: 5,
  });
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)), //Date.now()함수에 값으로 들어온 내용을 인식을 못해서 한 변환과정
    },
  };
}

export default Page;
