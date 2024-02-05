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
    body: { talk },
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

  if (req.method === "POST") {
    const chat = await client.talk.create({
      data: {
        talk,
        user: {
          connect: {
            id: user?.id,
          },
        },
        chatRoom: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
    res.json({ ok: true, chat });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler }),
);
