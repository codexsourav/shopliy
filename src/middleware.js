import { NextResponse } from 'next/server'
import KEYS from "./keys";
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const getAuth = async () => {
        try {
            let userToken;

            userToken = request.cookies.get();

            console.log(userToken);
            console.log(request);
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
                console.log("Server Auth IS False Get" + userToken);
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
