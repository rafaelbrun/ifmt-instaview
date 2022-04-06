import { NextResponse } from "next/server";

const instaUrl =
  "https://api.instagram.com/oauth/authorize" +
  "?client_id=1281631838991518" +
  "&redirect_uri=https://ifmt-instaview.vercel.app/main/" +
  "&scope=user_profile,user_media" +
  "&response_type=code";

export async function middleware(req: any) {
  const { pathname } = req.nextUrl;
  if (pathname == "/insta-api") {
    return NextResponse.redirect(instaUrl);
  }
  return NextResponse.next();
}
