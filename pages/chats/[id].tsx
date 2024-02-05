import type { NextPage } from "next";
import Layout from "../../components/layout";
import Message from "../../components/message";
import useSWR from "swr";
import { useRouter } from "next/router";
import { Talk, User } from "@prisma/client";
import useUser from "@/libs/client/useUser";

interface TalksWithUser extends Talk {
  user: User;
}
interface chatsResponse {
  ok: boolean;
  chats: TalksWithUser[];
}

const ChatDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data } = useSWR<chatsResponse>(`/api/chats/${router.query.id}`);
  //query로 받아오는 id값은 채팅방의 id
  return (
    <Layout canGoBack title="Steve">
      <div className="space-y-4 px-4 py-10 pb-16">
        {data?.chats.map((chat) => (
          <Message
            key={chat.id}
            name={chat.user.name}
            message={chat.talk}
            reversed={chat.user.id === user?.id}
          />
        ))}
        <form className="fixed inset-x-0 bottom-0  bg-white py-2">
          <div className="relative mx-auto flex w-full  max-w-md items-center">
            <input
              type="text"
              className="w-full rounded-full border-gray-300 pr-12 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-orange-500"
            />
            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <button className="flex items-center rounded-full bg-orange-500 px-3 text-sm text-white hover:bg-orange-600 focus:ring-2 focus:ring-orange-500 focus:ring-offset-2">
                &rarr;
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default ChatDetail;
