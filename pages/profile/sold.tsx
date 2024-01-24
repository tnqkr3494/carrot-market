import type { NextPage } from "next";
import Layout from "../../components/layout";
import ProductList from "@/components/product-list";

const Loved: NextPage = () => {
  return (
    <Layout title="판매내역" canGoBack>
      <ProductList kind="sales" />
    </Layout>
  );
};

export default Loved;
