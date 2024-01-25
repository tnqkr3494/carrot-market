import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import client from "@/libs/server/client";
import { withApiSession } from "@/libs/server/withSession";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  if (req.method === "GET") {
    const profile = await client.user.findUnique({
      where: { id: req.session.user?.id },
    });
    return res.json({
      ok: true,
      profile,
    });
  }
  if (req.method === "POST") {
    const {
      session: { user },
      body: { email, phone, name },
    } = req;

    const currentUser = await client.user.findUnique({
      where: {
        id: user?.id,
      },
    });

    // 만약 이메일이 폼으로 들어오고, 현재 로그인되있는 유저가 이메일을 변경할 때
    if (email && email != currentUser?.email) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            email,
          },
          select: {
            id: true,
          },
        }),
      );
      if (alreadyExists) {
        return res.json({ ok: false, error: "Email already taken" });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          email,
        },
      });
      return res.json({ ok: true });
    }
    // 만약 폰번호가 폼으로 들어오고, 현재 로그인되있는 유저가 폰번호를 변경할 때
    if (phone && phone != currentUser?.phone) {
      const alreadyExists = Boolean(
        await client.user.findUnique({
          where: {
            phone,
          },
          select: {
            id: true,
          },
        }),
      );
      if (alreadyExists) {
        return res.json({ ok: false, error: "Phone number already taken" });
      }
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          phone,
        },
      });
      return res.json({ ok: true });
    }

    if (name) {
      await client.user.update({
        where: {
          id: user?.id,
        },
        data: {
          name,
        },
      });
      return res.json({ ok: true });
    }
    return res.json({ ok: true });
  }
}

export default withApiSession(
  withHandler({ methods: ["GET", "POST"], handler }),
);
