// Next.js API
import type { NextApiRequest, NextApiResponse } from "next";

//libs
import axios from "axios";
import { promises as fsPromises, createReadStream } from "fs";
import FormData from "form-data";

import { File, IncomingForm } from "formidable";

import { withSessionRoute } from "../../../utils/sesion";

//types
import { IState, IMessage } from "../../../interfaces/";

type Data = {
  message: IMessage;
  state: IState;
  data: FormData | null;
};

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      token: string;
    };
  }
}

//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};

let empresaIdValue: string | undefined;

export default withSessionRoute(handler);

async function handler(req: NextApiRequest, res: NextApiResponse) {
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

const saveFile = async (file: File) => {
  try {
    const data = await fsPromises.readFile(file.filepath);
    const filePath = `./uploads/${file.originalFilename}`;
    await fsPromises.writeFile(filePath, data);
    await fsPromises.unlink(file.filepath);

    return filePath;
  } catch (error) {
    console.error("Error al manipular archivos:", error);
    throw error;
  }
};

const parseFile = (req: NextApiRequest): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    const form = new IncomingForm();

    form.on("field", (field, value) => {
      if (field === "empresa_id") {
        empresaIdValue = value;
      }
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        const file = (files.file as File[])?.[0];

        if (!file) {
          resolve(null);
        } else {
          const filePath = await saveFile(file);
          resolve(filePath);
        }
      }
    });
  });
};

async function postData(req: NextApiRequest, res: NextApiResponse<Data>) {
  try {
    const body = await parseFile(req);

    if (body === null) {
      return res.status(400).json({
        message: "No se proporcionó ningún archivo",
        data: null,
        state: "ERROR",
      });
    }

    setTimeout(async function () {
      try {
        let formData = new FormData();
        formData.append("archivo_usuarios", createReadStream(body));
        formData.append("empresa_id", empresaIdValue);

        console.log(`${process.env.API_BACK}valxlsusuarios.json`);

        const response = await axios({
          method: "POST",
          url: `${process.env.API_BACK}valxlsusuarios.json`,
          data: formData,
          headers: {
            ...formData.getHeaders(),
            Authorization: `Bearer ${req.session.user?.token}`,
          },
        });

        const data = response.data;
        const status = response.status;

        if (status === 200) {
          if (data.ejecucion.estado) {
            setTimeout(async () => {
              try {
                let formData = new FormData();
                formData.append("archivo_usuarios", createReadStream(body));
                formData.append("empresa_id", empresaIdValue);

                console.log(`${process.env.API_BACK}crgusuarios.json`);

                const response = await axios({
                  method: "POST",
                  url: `${process.env.API_BACK}crgusuarios.json`,
                  data: formData,
                  headers: {
                    ...formData.getHeaders(),
                    Authorization: `Bearer ${req.session.user?.token}`,
                  },
                });

                const data = response.data;

                return res.status(200).json({
                  message: "Datos ok",
                  state: "OK",
                  data,
                });
              } catch (error) {
                console.error("Error al procesar la solicitud:", error);
                return res.status(500).json({
                  message: "Error interno del servidor",
                  data: null,
                  state: "ERROR",
                });
              }
            }, 1000);
          }
        }

        return res.status(200).json({
          message: "Datos ok",
          state: "OK",
          data,
        });
      } catch (error) {
        console.error("Error al procesar la solicitud:", error);
        return res.status(500).json({
          message: "Error interno del servidor",
          data: null,
          state: "ERROR",
        });
      }
    }, 1000);
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Error al validar archivo",
      data: null,
      state: "ERROR",
    });
  }
}
