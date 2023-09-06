
// next-auth.js
import NextAuth from 'next-auth';
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        // Add other authentication providers if needed
    ],
    // Add custom configurations if necessary
});


export { handler as GET, handler as POST }