
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import LinkedInProvider from "next-auth/providers/linkedin";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
      authorization: { params: { scope: 'profile email openid' }},
      issuer: 'https://www.linkedin.com',
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      async profile(profile) {
        return {
            id: profile.sub,
            name: profile.name,
            firstname: profile.given_name,
            lastname: profile.family_name,
            email: profile.email
        }
      }         
    })
  ],
  database: process.env.NEXT_PUBLIC_DATABASE_URL,
  callbacks: {
    async session({ session, token, user }) {
      session.user.accessToken = token.accessToken
      session.user.userId = token.userId
      return session;
    },
    async jwt({ token, account }) {
      console.log(token)
      // console.log(account)
      // console.log(process.env.STRAPI_BACKEND_URL)
      if (account) {
        const response = await fetch(
          `${process.env.STRAPI_BACKEND_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`
        );
        const data = await response.json();
        const {jwt, user} = data;
        token.accessToken = jwt;
        user && (token.userId = user.id ?? user.sub)
      }
      return token;
    }
  },
  session: {
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    strategy: "jwt",
  },
  // pages: {
  //   signIn: "/login",
  // },
  secret: process.env.NEXTAUTH_SECRET
};