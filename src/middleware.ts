import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher([
    '/',
]);

export default clerkMiddleware((auth, req) => {
    // Route is protected
    if (isProtectedRoute(req)) {
        auth().protect();
    }
    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};