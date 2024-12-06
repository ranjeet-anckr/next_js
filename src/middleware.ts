import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const baseURL = process.env.NEXT_PUBLIC_SITE_URL;

async function fetchValidSubdomains(): Promise<string[]> {
  const apiURL = `${baseURL}/api/subdomains`;
  try {
    const response = await fetch(apiURL);
    if (!response.ok) {
      console.error("Failed to fetch subdomains:", response.statusText);
      return [];
    }
    const data = await response.json();
    return data.map((subdomain: { name: string }) => subdomain.name); 
  } catch (error) {
    console.error("Error fetching subdomains:", error);
    return [];
  }
}

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const host = request.headers.get("host");
  const subdomain = host?.split(".")[0];

  if (subdomain === "www" || host === `http://${baseURL}` || url.pathname.endsWith("/not-found")) {
    return NextResponse.next();
  }

  console.error("Debug Info:", { url: url.href, host, subdomain });

  const validSubdomains = await fetchValidSubdomains();

  if (!validSubdomains.includes(subdomain || "")) {
    const redirectURL = new URL(`${url.protocol}//${baseURL}/not-found`, request.url);
    console.log("Redirecting to:", redirectURL.href);
    return NextResponse.redirect(redirectURL);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
