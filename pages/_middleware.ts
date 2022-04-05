import { NextResponse, NextRequest } from "next/server";

const instaUrl =
  "https://api.instagram.com/oauth/authorize" +
  "?client_id=1281631838991518" +
  "&redirect_uri=https://localhost:3001/main/" +
  "&scope=user_profile" +
  "&response_type=code";

export async function middleware(req: any, ev: any) {
  const { pathname } = req.nextUrl;
  if (pathname == "/insta-api") {
    return NextResponse.redirect(instaUrl);
  }
  return NextResponse.next();
}
