// Next.js API
import type { NextApiRequest, NextApiResponse } from "next";

//libs
import axios from "axios";
import { withSessionRoute } from "../../../utils/sesion";

//types
import { IAuth } from "../../../interfaces/index";

type Data = { message: string } | IAuth;

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      token: string;
    };
  }
}

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  //Handle Login
  switch (req.method) {
    case "POST":
      return auth(req, res);
    case "DELETE":
      return logOut(req, res);
    default:
      return res.status(400).json({
        message: "Bad request",
      });
  }
}

async function auth(req: NextApiRequest, res: NextApiResponse<Data>) {
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

    if (data?.auth_token) {
      req.session.user = {
        token: data.auth_token,
      };
      await req.session.save();
    }

    return res.json(data);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Login Problem",
    });
  }
}

async function logOut(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    req.session.destroy();
    res.send({ message: "Sesión cerrada" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Login Problem",
    });
  }
}
