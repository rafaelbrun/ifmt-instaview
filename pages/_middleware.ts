import { NextResponse } from "next/server";
import { CONSTANTS } from "../src/constants";

const instaUrl =
  "https://api.instagram.com/oauth/authorize" +
  `?client_id=${CONSTANTS.ClientId}` +
  `&redirect_uri=${CONSTANTS.RedirectUri}` +
  "&scope=user_profile,user_media" +
  "&response_type=code";

export async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  if (pathname == "/insta-api") {
    return NextResponse.redirect(instaUrl);
  }
  return NextResponse.next();
}
