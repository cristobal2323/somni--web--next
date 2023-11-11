// Next.js API
import type { NextApiRequest, NextApiResponse } from "next";

// libs
import axios from "axios";
import { withSessionRoute } from "../../../utils/sesion";

// types
import { IDataUser, IState, IMessage } from "../../../interfaces/";

type Data = {
  message: IMessage;
  state: IState;
  data: IDataUser | null;
};

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
    case "GET":
      return getData(req, res);
    case "PUT":
      return putUser(req, res);
    default:
      return res.status(400).json({
        message: "Bad request",
        data: null,
        state: "ERROR",
      });
  }
}

async function getData(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const obj = req.query;

    console.log(`${process.env.API_BACK}datuser`, obj);
    const response = await axios.post(
      `${process.env.API_BACK}datuser.json`,
      obj,
      {
        headers: {
          accept: "application/json;",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${req.session.user?.token}`,
        },
      }
    );

    const data = response.data;

    return res.status(200).json({
      message: "Datos ok",
      state: "OK",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener la data del usuario",
      data: null,
      state: "ERROR",
    });
  }
}

async function putUser(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const obj = req.body;

    console.log(`${process.env.API_BACK}upuser`, obj);
    const response = await axios.post(
      `${process.env.API_BACK}upuser.json`,
      obj,
      {
        headers: {
          accept: "application/json;",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${req.session.user?.token}`,
        },
      }
    );

    const data = response.data;

    return res.status(200).json({
      message: "Datos ok",
      state: "OK",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al actualizar usuario",
      data: null,
      state: "ERROR",
    });
  }
}
