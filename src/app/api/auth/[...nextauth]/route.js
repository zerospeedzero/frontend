import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { signIn } from '@/lib/authservice';


const handler = NextAuth({
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: 'Sign in with Email',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        /**
         * This function is used to define if the user is authenticated or not.
         * If authenticated, the function should return an object contains the user data.
         * If not, the function should return `null`.
         */
        if (credentials == null) return null;
        /**
         * credentials is defined in the config above.
         * We can expect it contains two properties: `email` and `password`
         */
        try {
          const { user, jwt } = await signIn({
            email: credentials.email,
            password: credentials.password,
          });
          return { ...user, jwt };
          // return data;
        } catch (error) {
          // Sign In Fail
          return null;
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token }) => {
      // console.log('session', session)
      // console.log('user', user)
      // console.log('token', token)
      session.id = token.id;
      session.jwt = token.jwt;
      session.user.data = token.data;
      return Promise.resolve(session);
    },
    jwt: async ({ token, account, user }) => {
      // console.log(user)
      // token.accessToken = user.jwt
      const userData = await fetch(
        `${process.env.STRAPI_BACKEND_URL}/api/users/me?populate=*`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token.jwt}`,
          }
        }
      )
      if(userData) {
        const data = await userData.json();
        token.data = data
      }
      const isSignIn = user ? true : false;
      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.name = user.username;
      }
      return Promise.resolve(token);
    }
  },
});

export { handler as GET, handler as POST };