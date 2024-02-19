import client from "@/libs/server/client";
import smtpTransport from "@/libs/server/email";
import withHandler, { ResponseType } from "@/libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>,
) {
  const { phone, email } = req.body;
  const user = phone ? { phone } : email ? { email } : null;
  if (!user) {
    console.log("error");
    return res.status(400).json({ ok: false });
  }

  // Check if the user already exists
  const existingUser = await client.user.findUnique({
    where: user,
  });

  if (existingUser) {
    // If the user already exists, generate a payload and create a token
    const payload = Math.floor(100000 + Math.random() * 900000) + "";
    const token = await client.token.create({
      data: {
        payload,
        user: {
          connect: user,
        },
      },
    });
    return res.json({ ok: true });
  } else {
    return res.json({
      ok: false,
      error: "You have to Sign Up",
      id: Date.now(),
    });
  }
  /*if (email) {
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "Nomad Carrot Authentication Email",
      text: `Authentication Code : ${payload}`,
    };
    const result = await smtpTransport.sendMail(
      mailOptions,
      (error, responses) => {
        if (error) {
          console.log(error);
          return null;
        } else {
          console.log(responses);
          return null;
        }
      },
    );
    smtpTransport.close();
    console.log(result);
  }*/
}

export default withHandler({ methods: ["POST"], handler, isPrivate: false });
