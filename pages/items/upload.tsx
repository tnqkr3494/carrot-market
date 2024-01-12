import type { NextPage } from "next";

const Upload: NextPage = () => {
  return (
    <div className="space-y-5 px-4 py-10">
      <div>
        <label className="hover:text-ornage-500 flex h-48 w-full items-center justify-center border-2 border-dashed border-gray-300 hover:border-orange-500 hover:text-orange-500">
          <svg
            className="h-12 w-12"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          <input className="hidden" type="file" />
        </label>
      </div>
      <div>
        <label>Price</label>
        <div className="relative flex items-center">
          <span className="pointer-events-none absolute left-0 pl-3 text-gray-500">
            $
          </span>
          <input
            className="w-full rounded-md border-gray-300 pl-7 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            type="text"
            placeholder="0.00"
          />
          <span className="pointer-events-none absolute right-0 pr-3 text-gray-500">
            USD
          </span>
        </div>
      </div>
      <div>
        <label>Description</label>
        <div>
          <textarea
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            rows={4}
          />
        </div>
      </div>
      <button className="w-full rounded-md bg-orange-500 p-2 text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
        Upload product
      </button>
    </div>
  );
};

export default Upload;
