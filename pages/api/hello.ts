// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "../../utils/sesion";

type Data = {
  token: string | undefined;
};

export default withSessionRoute(handler);

function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  res.status(200).json({ token: req.session.user?.token });
}
