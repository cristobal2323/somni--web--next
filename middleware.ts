// /middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { getIronSession } from "iron-session/edge";

export const middleware = async (req: NextRequest) => {
  const res = NextResponse.next();

  const session = await getIronSession(req, res, {
    password: process.env.SESION_PASS || "",
    cookieName: process.env.SESION_COOKIE || "",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  });

  // do anything with session here:
  const { user } = session;
  const { pathname } = req.nextUrl;
  // like mutate user:
  // user.something = someOtherThing;
  // or:
  // session.user = someoneElse;

  // uncomment next line to commit changes:
  // await session.save();
  // or maybe you want to destroy session:
  // await session.destroy();

  //console.log("from middleware", { user }, user?.token, req.url, pathname);

  // demo:
  if (user?.token === undefined && pathname !== "/") {
    return NextResponse.redirect(new URL("/", req.url), 301); // redirect to /unauthorized page
  } else if (pathname === "/" && user?.token !== undefined) {
    return NextResponse.redirect(new URL("/dashboard", req.url), 301);
  }

  return res;
};

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/control",
    "/dashboard/details",
    "/dashboard/users",
    "/",
  ],
};
