// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

import { IAuth } from "../../../interfaces/index";

type Data = { message: string } | IAuth;

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //Handle Login
  switch (req.method) {
    case "POST":
      return auth(req, res);
    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

async function auth(req: NextApiRequest, res: NextApiResponse<Data>) {
  console.log(`${process.env.API_BACK}authadmincli`, req.body);
  try {
    const response = await axios.post(
      `${process.env.API_BACK}authadmincli.json`,
      req.body,
      {
        headers: {
          accept: "application/json;",
          "Content-Type": "application/json",
        },
      }
    );

    const data = response.data;

    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Login Problem",
    });
  }
}
