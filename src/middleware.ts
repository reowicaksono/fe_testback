import { NextRequest, NextResponse } from "next/server";
import { protectedRoutes, publicRoutes } from "./routes";


const  isProtectedPath = (pathName: string): boolean =>{
    return protectedRoutes.some(route => pathName.startsWith(route))
}

const isPublicPath = (pathName: string) : boolean => {
    return publicRoutes.some(route => pathName === route || pathName.startsWith(route))
}

const isValidToken = (token: string) : boolean =>{
    try{
        const parts = token.split('.');
        if(parts.length !== 3) return false;
        const payload = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        const currentTime = Math.floor(Date.now()/1000);
        return payload.exp > currentTime;
    }catch{
        return false;
    }
}
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // TO-DO : add new header x-current
  const headers = new Headers(request.headers);
  headers.set("x-current-path", pathname);

  const accessToken = request.cookies.get("access_token")?.value;
  const refreshToken = request.cookies.get("refresh_token")?.value;

  if(isPublicPath(pathname) && pathname !== "/" && (accessToken || refreshToken)) {
    if(accessToken && isValidToken(accessToken)) {
      const redirectUrl = request.nextUrl.searchParams.get("redirect");
      const targetUrl = redirectUrl || "/dashboard";
      return NextResponse.redirect(new URL(targetUrl, request.url));
    }

    if(refreshToken && (!accessToken || !isValidToken(accessToken))) {
      const response = NextResponse.next({ headers });
      response.cookies.delete("access_token");
      response.cookies.delete("refresh_token");
      return response;
    }
  }

  if(isPublicPath(pathname)) return NextResponse.next({ headers });
  if(!isProtectedPath(pathname)) return NextResponse.next({ headers });

  if(!accessToken && !refreshToken){
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect",pathname);
    return NextResponse.redirect(loginUrl);
  }

  if(accessToken && isValidToken(accessToken)) return NextResponse.next({ headers });


  if(refreshToken && (!accessToken || !isValidToken(accessToken))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }
  
  const loginUrl = new URL("/login", request.url);
  loginUrl.searchParams.set("redirect", pathname);
  return NextResponse.redirect(loginUrl);
}

