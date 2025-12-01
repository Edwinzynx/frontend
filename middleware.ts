import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
    function middleware(req) {
        const token = req.nextauth.token
        const path = req.nextUrl.pathname
        const userRole = token?.role

        // Protect Student Routes
        if (path.startsWith("/student") && userRole !== "STUDENT") {
            return NextResponse.redirect(new URL("/faculty", req.url))
        }

        // Protect Faculty Routes
        if (path.startsWith("/faculty") && userRole !== "FACULTY") {
            return NextResponse.redirect(new URL("/student", req.url))
        }

        return NextResponse.next()
    },
    {
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
)

export const config = {
    matcher: ["/student/:path*", "/faculty/:path*"],
}
