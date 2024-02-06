import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    session: { user },
  } = req;

  const chatRooms = await client.chatRoom.findMany({
    where: {
      OR: [
        {
          hostId: user?.id,
        },
        {
          invitedId: user?.id,
        },
      ],
    },
    include: {
      invited: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      host: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      talk: {
        select: {
          talk: true,
        },
        take: 1,
      },
      product: {
        select: {
          id: true,
          name: true,
          price: true,
        },
      },
    },
  });

  res.json({ ok: true, chatRooms });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
