// Next.js API
import type { NextApiRequest, NextApiResponse } from "next";

//libs
import axios from "axios";
import { withSessionRoute } from "../../../utils/sesion";

//types
import { IState, IMessage } from "../../../interfaces/";

interface IAsignacion {
  ejecucion: Ejecucion;
  datos: null;
}

interface Ejecucion {
  estado: boolean;
  mensaje: string;
}

// Types
type Data = {
  message: IMessage;
  state: IState;
  data: IAsignacion | null;
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
    case "POST":
      return postData(req, res);
    default:
      return res.status(400).json({
        message: "Bad request",
        data: null,
        state: "ERROR",
      });
  }
}

async function postData(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const obj = req.body;

    console.log(`${process.env.API_BACK}asigturnouser`, obj);
    const response = await axios.post(
      `${process.env.API_BACK}asigturnouser.json`,
      obj,
      {
        headers: {
          accept: "application/json;",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${req.session.user?.token}`,
        },
      }
    );
    const status = response.status;
    const data = response.data;

    return res.status(200).json({
      message: "Datos ok",
      state: "OK",
      data,
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener el reporte",
      data: null,
      state: "ERROR",
    });
  }
}
