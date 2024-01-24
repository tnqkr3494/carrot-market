import { ProductWithCount } from "@/pages";
import useSWR from "swr";
import Item from "./item";

interface ProductListProps {
  kind: "sales" | "favs" | "purchases";
}

interface Record {
  id: number;
  product: ProductWithCount;
}
interface ProductListResponse {
  [key: string]: Record[];
}

export default function ProductList({ kind }: ProductListProps) {
  const { data } = useSWR<ProductListResponse>(`/api/users/me/${kind}`);

  return (
    <>
      <div className="flex flex-col space-y-5 divide-y  pb-10">
        {data
          ? data[kind]?.map((record) => (
              <Item
                key={record.id}
                id={record.product.id}
                title={record.product.name}
                price={record.product.price}
                hearts={record.product._count.Fav}
              />
            ))
          : null}
      </div>
    </>
  );
}
