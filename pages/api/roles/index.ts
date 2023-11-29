// Next.js API
import type { NextApiRequest, NextApiResponse } from "next";

//libs
import axios from "axios";
import { withSessionRoute } from "../../../utils/sesion";

//types
import { IRoles, IState, IMessage } from "../../../interfaces/";

type Data = {
  message: IMessage;
  state: IState;
  data: IRoles | null;
};

type DataPost = {
  message: IMessage;
  state: IState;
  data: string | null;
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      token: string;
    };
  }
}

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  //Handle Login
  switch (req.method) {
    case "GET":
      return getData(req, res);
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

async function getData(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const obj = req.query;

    console.log(`${process.env.API_BACK}lisrol`, obj);
    const response = await axios.post(
      `${process.env.API_BACK}lisrol.json`,
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

async function postData(req: NextApiRequest, res: NextApiResponse<DataPost>) {
  try {
    const obj = req.body;

    console.log(`${process.env.API_BACK}lisuserrol`, obj);
    const response = await axios.post(
      `${process.env.API_BACK}lisuserrol.json`,
      { user_id: obj.user_id },
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

    if (status === 200) {
      if (data.ejecucion.estado) {
        const deleteFetch: any[] = [];
        data.datos.forEach(async (item: any) => {
          deleteFetch.push(
            axios
              .post(
                `${process.env.API_BACK}deluserrol.json`,
                { id: item.id },
                {
                  headers: {
                    accept: "application/json;",
                    "Content-Type": "application/json;charset=UTF-8",
                    Authorization: `Bearer ${req.session.user?.token}`,
                  },
                }
              )
              .then(function (response) {
                return response.data;
              })
          );
        });

        const responseAllDelete = await Promise.all(deleteFetch);

        if (
          responseAllDelete[0]?.ejecucion?.estado ||
          deleteFetch.length === 0
        ) {
          const addFetch: any[] = [];
          obj.turnos.forEach(async (item: any) => {
            addFetch.push(
              axios
                .post(
                  `${process.env.API_BACK}cruserrol.json`,
                  { rol_id: item, user_id: obj.user_id },
                  {
                    headers: {
                      accept: "application/json;",
                      "Content-Type": "application/json;charset=UTF-8",
                      Authorization: `Bearer ${req.session.user?.token}`,
                    },
                  }
                )
                .then(function (response) {
                  return response.data;
                })
            );
          });

          const responseAllAdd = await Promise.all(addFetch);

          if (responseAllAdd[0]?.ejecucion?.estado || addFetch.length === 0) {
            return res.status(200).json({
              message: "Datos ok",
              state: "OK",
              data: "OK",
            });
          }
        }
      }
    }

    /*  console.log(`${process.env.API_BACK}asigturnouser`, obj);
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
    const data = response.data; */

    return res.status(200).json({
      message: "Datos ok",
      state: "OK",
      data: "OK",
    });
  } catch (error) {
    return res.status(400).json({
      message: "Error al obtener el reporte",
      data: null,
      state: "ERROR",
    });
  }
}
