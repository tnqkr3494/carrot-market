import type { NextPage } from "next";
import Link from "next/link";
import Layout from "../../components/layout";
import { ChatRoom, Product, Talk, User } from "@prisma/client";
import useSWR from "swr";
import useUser from "@/libs/client/useUser";

interface chatRoomsWithUser extends ChatRoom {
  invited: User;
  host: User;
  talk: Talk[];
  product: Product;
}
interface chatRoomsResponse {
  ok: boolean;
  chatRooms: chatRoomsWithUser[];
}

const Chats: NextPage = () => {
  const { user } = useUser();
  const { data } = useSWR<chatRoomsResponse>("/api/chats");
  return (
    <Layout hasTabBar title="채팅">
      <div className="divide-y-[1px] ">
        {data?.chatRooms ? (
          data.chatRooms.map((room) => (
            <Link href={`/chats/${room.id}`} key={room.id} legacyBehavior>
              <a className="flex cursor-pointer items-center space-x-3 px-4 py-3">
                <div className="h-12 w-12 rounded-full bg-slate-300" />
                <div>
                  <p className=" text-gray-700">
                    물품이름 :{" "}
                    <span className="font-bold">{room.product.name}</span> /
                    대화상대 :{" "}
                    <span className="font-bold">
                      {room.invited.id === user?.id
                        ? room.host.name
                        : room.invited.name}
                    </span>
                  </p>
                  <p className="text-sm  text-gray-500">
                    {room.talk[0]?.talk ? room.talk[0].talk : ""}
                  </p>
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
