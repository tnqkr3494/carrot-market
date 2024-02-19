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
    query: { page },
  } = req;

  const take = 5;
  let skip = (Number(page) - 1) * 5;

  if (req.method == "GET") {
    const products = await client.product.findMany({
      take,
      skip,

      include: {
        _count: {
          select: {
            Fav: true,
          },
        },
        Purchase: {
          select: {
            id: true,
          },
        },
      },
    });
    res.json({ ok: true, products });
  }
  if (req.method == "POST") {
    const {
      body: { name, price, description },
      session: { user },
    } = req;

    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: "xx",
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });

    res.json({
      ok: true,
      product,
    });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler }),
);
