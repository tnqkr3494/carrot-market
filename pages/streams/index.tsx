import { NextPage } from "next";

const Live: NextPage = () => {
  return (
    <div className="space-y-4 divide-y-[1px] px-4 py-10">
      {[1, 2, 3, 4, 5, 6].map((_, i) => (
        <div className="pt-4" key={i}>
          <div className="aspect-video w-full bg-slate-300"></div>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">Galaxy S50</h1>
        </div>
      ))}
      <button className="fixed bottom-20 right-10 rounded-full border-transparent bg-orange-500 p-3 text-white transition-colors hover:bg-orange-600">
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Live;
