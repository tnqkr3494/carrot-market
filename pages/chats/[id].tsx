import type { NextPage } from "next";
import Layout from "../../components/layout";
import Message from "../../components/message";
import useSWR from "swr";
import { useRouter } from "next/router";
import { ChatRoom, Talk, User } from "@prisma/client";
import useUser from "@/libs/client/useUser";
import { useForm } from "react-hook-form";
import useMutation from "@/libs/client/useMutation";

interface TalkWithUser extends Talk {
  user: User;
}

interface TalkInChatRoom extends ChatRoom {
  talk: TalkWithUser[];
}
interface ChatsResponse {
  ok: boolean;
  chats: TalkInChatRoom;
}

interface TalkForm {
  talk: string;
}

const ChatDetail: NextPage = () => {
  const { user } = useUser();
  const router = useRouter();
  const { data, mutate } = useSWR<ChatsResponse>(
    router.query.id ? `/api/chats/${router.query.id}` : null,
  );
  //query로 받아오는 id값은 채팅방의 id
  const [postTalk] = useMutation(`/api/chats/${router.query.id}`);
  const { register, handleSubmit, reset } = useForm<TalkForm>();

  const onValid = (data: TalkForm) => {
    reset();
    postTalk(data);
  };

  return (
    <Layout canGoBack title="Steve">
      <div className="space-y-4 px-4 py-10 pb-16">
        {data?.chats.talk.map((chat, index) => (
          <Message
            key={index}
            message={chat.talk}
            reversed={chat.user.id === user?.id}
            name={chat.user.name}
          />
        ))}
        <form
          onSubmit={handleSubmit(onValid)}
          className="fixed inset-x-0 bottom-0  bg-white py-2"
        >
          <div className="relative mx-auto flex w-full  max-w-md items-center">
            <input
              {...register("talk", { required: true, minLength: 2 })}
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
