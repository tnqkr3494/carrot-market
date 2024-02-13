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
      Purchase: {
        select: {
          userId: true,
        },
      },
    },
  });

  //물건을 구매한 유저와 현재 로그인 돼있는 유저가 같으면(구매한 유저가 리뷰남길 때)
  if (product?.Purchase[0].userId === user?.id) {
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

    res.json({
      ok: true,
    });
  }
  // 물건을 구매한 유저와 로그인 돼있는 유저가 다를 때(물건을 구매하지 않은 유저가 url로 direct하게와서 리뷰남기려고 할 때)
  else {
    res.json({
      ok: false,
      error: "You do not have permission to leave a review.",
    });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
