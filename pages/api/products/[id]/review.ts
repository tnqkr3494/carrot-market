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

  const findSeller = await client.product.findUnique({
    where: {
      id: Number(id),
    },
  });

  const newReview = await client.review.create({
    data: {
      score: Number(score),
      review,
      createdBy: {
        connect: {
          id: user?.id,
        },
      },
      createdFor: {
        connect: {
          id: findSeller?.userId,
        },
      },
    },
  });

  res.json({ ok: true });
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
