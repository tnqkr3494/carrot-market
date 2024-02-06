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

  const invitedUser = await client.user.findUnique({
    where: {
      id: Number(id),
    },
  });

  //물건을 파는 사람이 존재하면
  if (invitedUser) {
    const chatRoom = await client.chatRoom.create({
      data: {
        host: {
          connect: {
            id: user?.id,
          },
        },
        invited: {
          connect: {
            id: invitedUser.id,
          },
        },
      },
    });
    console.log("true");
    res.json({
      ok: true,
    });
  }

  //물건을 파는 사람이 존재하지 않는다면(이미 팔렸거나, 탈퇴했거나)
  else {
    console.log("false");
    res.json({
      ok: false,
    });
  }
}

export default withApiSession(withHandler({ methods: ["POST"], handler }));
