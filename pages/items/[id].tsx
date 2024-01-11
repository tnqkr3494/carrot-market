import type { NextPage } from "next";

const ItemDetail: NextPage = () => {
  return (
    <div className="p-4">
      <div>
        <div className="h-96 bg-slate-300" />
        <div className="flex items-center border-b border-gray-500 py-4">
          <div className="mr-3 h-14 w-14 rounded-full bg-slate-300" />
          <div className="cursor-pointer">
            <p className="text-base text-gray-900">Steve Jebs</p>
            <p className="text-sm text-gray-600">View profile &rarr;</p>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Galaxy S50</h1>
          <p className="border-b border-gray-500 pb-4 text-2xl text-gray-600">
            $140
          </p>
          <p className="text-base text-gray-500">
            My money&apos;s in that office, right? If she start giving me some
            bullshit about it ain&apos;t there, and we got to go someplace else
            and get it, I&apos;m gonna shoot you in the head then and there.
            Then I&apos;m gonna shoot that bitch in the kneecaps, find out where
            my goddamn money is. She gonna tell me too. Hey, look at me when
            I&apos;m talking to you, motherfucker. You listen: we go in there,
            and that ni**a Winston or anybody else is in there, you the first
            motherfucker to get shot. You understand?
          </p>
          <div className="flex items-center space-x-2">
            <button className="flex-1 rounded-md bg-orange-500 p-2 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
              Talk to seller
            </button>
            <svg
              className="h-6 w-6 hover:fill-red-500 hover:text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              cursor="pointer"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="mb-4 text-2xl font-bold text-gray-900">Similar items</h2>
        <div className="grid grid-cols-2 gap-4">
          {[1, 2, 3, 4, 5, 6].map((_, i) => (
            <div key={i}>
              <div className="mb-2 h-56 w-full bg-slate-300" />
              <h3 className="text-sm text-gray-700">Galaxy S60</h3>
              <p className="font-bold text-gray-900">$6</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;
