import { NextResponse } from 'next/server'
import KEYS from "./keys";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const getAuth = async () => {
        try {
            let userToken = request.cookies.get('user') ?? req.cookies.get("_vercel_jwt");
            console.log(request.cookies);
            if (!userToken) {
                return NextResponse.redirect(new URL('/auth/login', request.url))
            }

            let headersList = {
                "Accept": "*/*",
                "Authorization": "Bearer " + userToken.value
            }

            let response = await fetch(KEYS.APIHOST + "/auth", {
                method: "POST",
                headers: headersList
            });

            let data = await response.json();

            if (data.auth == false) {
                return NextResponse.redirect(new URL('/auth/login', request.url));
            } else {
                return NextResponse.next();
            }
        } catch (error) {
            console.log(error);
            return NextResponse.redirect(new URL('/auth/login', request.url));
        }
    }
    return getAuth();
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/admin/:path*',
}
