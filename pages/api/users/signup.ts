import client from "@/libs/server/client";
import withHandler from "@/libs/server/withHandler";
import { withApiSession } from "@/libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    body: { username, email },
  } = req;
  console.log(username, email);

  const alreadyExists = Boolean(
    await client.user.findFirst({
      where: {
        email,
      },
      select: {
        id: true,
      },
    }),
  );

  if (!alreadyExists) {
    await client.user.create({
      data: {
        email,
        name: username,
      },
    });
    res.json({ ok: true });
  } else {
    res.json({ ok: false, error: "This email is already taken." });
  }
};

export default withApiSession(
  withHandler({ methods: ["POST"], handler, isPrivate: false }),
);
