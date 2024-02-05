import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import { ChatRoom, Talk, User } from "@prisma/client";
import useSWR from "swr";

interface chatRoomsWithUser extends ChatRoom {
  invited: User;
  talk: Talk[];
}
interface chatRoomsResponse {
  ok: boolean;
  chatRooms: chatRoomsWithUser[];
}

const Chats: NextPage = () => {
  const { data } = useSWR<chatRoomsResponse>("/api/chats");
  return (
    <Layout hasTabBar title="채팅">
      <div className="divide-y-[1px] ">
        {data ? (
          data.chatRooms.map((room) => (
            <Link href={`/chats/${room.id}`} key={room.id} legacyBehavior>
              <a className="flex cursor-pointer items-center space-x-3 px-4 py-3">
                <div className="h-12 w-12 rounded-full bg-slate-300" />
                <div>
                  <p className="text-gray-700">{room.invited.name}</p>
                  <p className="text-sm  text-gray-500">{room.talk[0].talk}</p>
                </div>
              </a>
            </Link>
          ))
        ) : (
          <div>Loading</div>
        )}
      </div>
    </Layout>
  );
};

export default Chats;
