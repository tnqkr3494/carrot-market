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

  const purchase = await client.purchase.create({
    data: {
      user: {
        connect: {
          id: user?.id,
        },
      },
      product: {
        connect: {
          id: Number(id),
        },
      },
    },
  });

  const findSeller = await client.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  // findSeller?.userId : 판매자 아이디

  const sale = await client.sale.create({
    data: {
      user: {
        connect: {
          id: findSeller?.userId,
        },
      },
      product: {
        connect: {
          id: Number(id),
        },
      },
    },
  });

  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
