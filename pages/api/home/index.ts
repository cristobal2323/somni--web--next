// Next.js API
import type { NextApiRequest, NextApiResponse } from "next";

//libs
import axios from "axios";
import { withSessionRoute } from "../../../utils/sesion";

//types
import {
  IResumenTotales,
  IResumenPersonas,
  IResumenTiempo,
  IResumenPorcentajePersonas,
  IState,
  IMessage,
} from "../../../interfaces/";

type Data = {
  message: IMessage;
  state: IState;
  data: {
    resumenTotales: IResumenTotales;
    resumenPersonas: IResumenPersonas;
    resumenTiempo: IResumenTiempo;
    resumenPorcentajePersonas: IResumenPorcentajePersonas;
  } | null;
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

    console.log(`${process.env.API_BACK}resuctrxper.json`, obj);
    const responseResumenPersonas = await axios
      .post(`${process.env.API_BACK}resuctrxper.json`, obj, {
        headers: {
          accept: "application/json;",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${req.session.user?.token}`,
        },
      })
      .then(function (response) {
        return response.data;
      });

    console.log(`${process.env.API_BACK}resutotales.json`, obj);
    const responseResumenTotales = await axios
      .post(`${process.env.API_BACK}resutotales.json`, obj, {
        headers: {
          accept: "application/json;",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${req.session.user?.token}`,
        },
      })
      .then(function (response) {
        return response.data;
      });

    console.log(`${process.env.API_BACK}resuctrentiempo.json`, obj);
    const responseResumenTiempo = await axios
      .post(`${process.env.API_BACK}resuctrentiempo.json`, obj, {
        headers: {
          accept: "application/json;",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${req.session.user?.token}`,
        },
      })
      .then(function (response) {
        return response.data;
      });

    console.log(`${process.env.API_BACK}resuporcxper.json`, obj);
    const responseResumenPorcentajePersonas = await axios
      .post(`${process.env.API_BACK}resuporcxper.json`, obj, {
        headers: {
          accept: "application/json;",
          "Content-Type": "application/json;charset=UTF-8",
          Authorization: `Bearer ${req.session.user?.token}`,
        },
      })
      .then(function (response) {
        return response.data;
      });

    const [
      resumenPersonas,
      resumenTotales,
      resumenTiempo,
      resumenPorcentajePersonas,
    ] = await Promise.all([
      responseResumenPersonas,
      responseResumenTotales,
      responseResumenTiempo,
      responseResumenPorcentajePersonas,
    ]);

    return res.status(200).json({
      message: "Datos ok",
      state: "OK",
      data: {
        resumenPersonas,
        resumenTotales,
        resumenTiempo,
        resumenPorcentajePersonas,
      },
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener el reporte",
      data: null,
      state: "ERROR",
    });
  }
}
