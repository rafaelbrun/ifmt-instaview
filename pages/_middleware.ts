import { useRouter } from "next/router";
import { NextResponse } from "next/server";
// https://ifmt-instaview.vercel.app
// id=391741005810514
// secret=32b0187ec8e595cea6e9a5240ea16d09
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
