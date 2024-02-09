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
    body: { score, review },
    session: { user },
  } = req;

  const product = await client.product.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      name: true,
      user: {
        select: {
          id: true,
        },
      },
    },
  });

  const reviewDetail = `물품 : ${product?.name} ${review}`;

  const newReview = await client.review.create({
    data: {
      score: Number(score),
      review: reviewDetail,
      createdBy: {
        connect: {
          id: user?.id,
        },
      },
      createdFor: {
        connect: {
          id: product?.user.id,
        },
      },
    },
  });

  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
