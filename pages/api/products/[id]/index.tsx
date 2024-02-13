import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const product = await client.product.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      Purchase: {
        select: {
          id: true,
        },
      },
    },
  });

  const terms = product?.name
    .split(" ")
    .map((word) => ({ name: { contains: word } }));

  const relatedProducts = await client.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });

  const isLinked = Boolean(
    await client.fav.findFirst({
      where: {
        userId: user?.id,
        productId: product?.id,
      },
      select: {
        id: true,
      },
    }),
  );

  const findChatRoom = await client.chatRoom.findFirst({
    where: {
      productId: Number(id),
      hostId: user?.id,
    },
    select: {
      id: true,
    },
  });

  res.json({
    ok: true,
    product,
    relatedProducts,
    isLinked,
    findChatRoom,
  });
}

export default withApiSession(withHandler({ methods: ["GET"], handler }));
