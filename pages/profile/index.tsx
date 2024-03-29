import type { NextPage, NextPageContext } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import useUser from "@/libs/client/useUser";
import useSWR, { SWRConfig } from "swr";
import { User } from "@prisma/client";
import { withSsrSession } from "@/libs/server/withSession";
import client from "@/libs/server/client";

const Profile: NextPage = () => {
  const { user } = useUser();

  return (
    <Layout hasTabBar title="나의 캐럿">
      <div className="px-4">
        <div className="mt-4 flex items-center space-x-3">
          <div className="h-16 w-16 rounded-full bg-slate-500" />
          <div className="flex flex-col">
            <span className="font-medium text-gray-900">{user?.name}</span>
            <div>
              <Link href="/profile/edit" legacyBehavior>
                <a className="text-sm text-gray-700">Edit profile &rarr;</a>
              </Link>
              <Link href="/profile/reviews" legacyBehavior>
                <a className="ml-3 text-sm text-gray-700">See reviews &rarr;</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-10 flex justify-around">
          <Link href="/profile/sold" legacyBehavior>
            <a className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white">
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
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                판매내역
              </span>
            </a>
          </Link>
          <Link href="/profile/bought" legacyBehavior>
            <a className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white">
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                구매내역
              </span>
            </a>
          </Link>
          <Link href="/profile/loved" legacyBehavior>
            <a className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-orange-400 text-white">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <span className="mt-2 text-sm font-medium text-gray-700">
                관심목록
              </span>
            </a>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

const Page: NextPage<{ profile: User }> = ({ profile }) => {
  return (
    <SWRConfig
      value={{
        fallback: {
          "/api/users/me": { ok: true, profile },
        },
      }}
    >
      <Profile />
    </SWRConfig>
  );
};

export const getServerSideProps = withSsrSession(
  async ({ req }: NextPageContext) => {
    const profile = await client.user.findUnique({
      where: {
        id: req?.session.user?.id,
      },
    });
    return {
      props: {
        profile: JSON.parse(JSON.stringify(profile)),
      },
    };
  },
);

export default Page;
//export default값으로 정해준 컴포넌트로 getserversideprops로 보낸 props값을 사용할 수 있다.
