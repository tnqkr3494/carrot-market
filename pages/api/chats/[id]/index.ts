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
    query: { id },
  } = req;

  if (req.method === "GET") {
    const chats = await client.talk.findMany({
      where: {
        chatRoomId: Number(id),
      },
      select: {
        id: true,
        talk: true,
        user: {
          select: {
            name: true,
            avatar: true,
            id: true,
          },
        },
      },
    });
    res.json({ ok: true, chats });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler }),
);
