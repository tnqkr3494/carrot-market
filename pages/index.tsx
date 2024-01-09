import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    // space : 자식들에게 일정하게 마진을 줌
    <div className="bg-slate-400 py-20 px-10 flex flex-col space-y-5">
      <div className="bg-white p-6 rounded-2xl shadow-xl">
        <span className="font-semibold text-3xl">Select Item</span>
        <div className="flex justify-between my-2">
          <span className="text-gray-500">Grey Chair</span>
          <span className="font-semibold">$19</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Tooly Table</span>
          <span className="font-semibold">$81</span>
        </div>
        <div className="flex justify-between mt-2 pt-2 border-t-2 border-dashed">
          <span>Total</span>
          <span className="font-semibold">$100</span>
        </div>
        <div className="mt-5 bg-blue-500 text-white p-3 text-center rounded-full w-1/2 m-auto">
          Checkout
        </div>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-xl"></div>
      <div className="bg-white p-10 rounded-2xl shadow-xl"></div>
      <div className="bg-white p-10 rounded-2xl shadow-xl"></div>
    </div>
  );
};

export default Home;
