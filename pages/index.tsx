import type { NextPage } from "next";
import FloatingButton from "../components/floating-button";
import Item from "../components/item";
import Layout from "../components/layout";
import useSWR from "swr";
import { Product, Purchase, Review } from "@prisma/client";
import YourComponent from "@/components/page-button";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { maxPageState, nextPageState, pageState } from "@/atoms";

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
  const page = useRecoilValue(pageState);
  const setNextPage = useSetRecoilState(nextPageState);
  const maxPage = useRecoilValue(maxPageState);
  const { data } = useSWR<ProductsResponse>(`/api/products?page=${page}`);

  const onPrevClick = () => {
    setNextPage((prev) => (prev - 1 < 0 ? (prev = 0) : prev - 1));
  };
  const onNextClick = () => {
    setNextPage((prev) =>
      prev + 1 > maxPage - 1 ? (prev = maxPage - 1) : prev + 1,
    );
  };

  return (
    <>
      <Layout title="홈" hasTabBar>
        <div className="flex flex-col divide-y">
          {data?.products?.map((product) => (
            // 이미 팔린 물건인지 확인하는 작업은 백엔드에서 해야겠다(take에서 가져오는데 그 가져오는 것들 중 팔린물건이 있으면
            // 예를들어 5개를 가져왔는데 5개가 페이지에 보여질 줄 알았지만 3개가 팔린물건이면 2개만 보여서 pagination하기 힘들어짐.

            <Item
              id={product.id}
              key={product.id}
              title={product.name}
              price={product.price}
              hearts={product._count?.Fav || 0}
            />
          ))}
          <div className="flex items-center justify-center space-x-2 pt-3">
            <button onClick={onPrevClick}>◀️</button>
            <YourComponent />
            <button onClick={onNextClick}>▶️</button>
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

export default Home;
