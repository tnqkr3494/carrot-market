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
  product: {
    name: string;
    price: number;
  };
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
    {
      refreshInterval: 1000,
    },
  );
  //query로 받아오는 id값은 채팅방의 id
  const [postTalk] = useMutation(`/api/chats/${router.query.id}`);
  const { register, handleSubmit, reset } = useForm<TalkForm>();
  const [deleteRoom] = useMutation(`/api/chats/${router.query.id}/del`);

  const onValid = (data: TalkForm) => {
    reset();
    postTalk(data);
    mutate(
      (prev) =>
        prev &&
        ({
          ...prev,
          chats: {
            ...prev.chats,
            talk: [
              ...prev.chats.talk,
              { id: Date.now(), talk: data.talk, user: { ...user } },
            ],
          },
        } as any),
      false,
    );
  };

  const onExit = () => {
    router.push("/chats");
    deleteRoom({});
  };

  return (
    <Layout canGoBack title={`물품이름 : ${data?.chats.product.name}`}>
      <button onClick={onExit} className="mt-5 flex w-full">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          className="ml-auto h-6 w-6"
        >
          <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
        </svg>
      </button>
      <div className="space-y-4 px-4 py-10 pb-16">
        {data ? (
          data?.chats.talk.map((chat, index) => (
            <Message
              key={index}
              message={chat.talk}
              reversed={chat.user.id === user?.id}
              name={chat.user.name}
            />
          ))
        ) : (
          <div>Loading</div>
        )}
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
