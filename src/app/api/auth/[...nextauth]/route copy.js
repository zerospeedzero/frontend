// // pages/api/auth/[...nextauth].js
// import NextAuth from 'next-auth';
// import Providers from 'next-auth/providers';

// const handler = NextAuth ({
//   providers: [
//     Providers.Strapi({
//       url: `${process.env.STRAPI_BACKEND_URL}`,
//       userEndpoint: '/users',
//     }),
//   ],
//   pages: {
//     signIn: '/auth/signin',
//   },
// });

// export { handler as GET, handler as POST };

import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const options = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "text", placeholder: "test@test.com" },
        password: {  label: "Password", type: "password" }
      },
    async authorize(credentials) {
        // console.log(credentials)
        try {
          const { data } = await axios.post(`${process.env.STRAPI_BACKEND_URL}/api/auth/local`, {
          // const { data } = await axios.post(`http://localhost:3000/api/auth/local`, {
            identifier: credentials.email,
            password: credentials.password
          });
          if (data) {
            return data;
          }
          else {
            return null;
          }
        } catch (e) {
          console.log('caught error');
          console.log(e)
          // const errorMessage = e.response.data.message
          // Redirecting to the login page with error message          in the URL
          // throw new Error(errorMessage + '&email=' + credentials.email)
          return null;
        }
      }
    })
  ],

  session: {
    jwt: true,
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // Getting the JWT token from API response
    jwt: async (token, user, account) => {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.jwt = user.jwt;
        token.id = user.user.id;
        token.name = user.user.username;
        token.email = user.user.email;
      }
      return Promise.resolve(token);
    },
  
    session: async (session, user) => {
      session.jwt = user.jwt;
      session.id = user.id;
      return Promise.resolve(session);
    },
    // async session({ session, token, user }) {
    //   session.user.accessToken = token.accessToken
    //   session.user.userId = token.userId
    //   return session;
    // },
    // async jwt({ token, account }) {
    //   console.log(token)
    //   // console.log(account)
    //   // console.log(process.env.STRAPI_BACKEND_URL)
    //   if (account) {
    //     const response = await fetch(
    //       `${process.env.STRAPI_BACKEND_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`
    //     );
    //     const data = await response.json();
    //     const {jwt, user} = data;
    //     token.accessToken = jwt;
    //     user && (token.userId = user.id ?? user.sub)
    //   }
    //   return token;
    // }    
  }
}

// export default (req, res) => NextAuth(req, res, options)

const handler = NextAuth(options)
export {handler as GET, handler as POST}
