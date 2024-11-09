// apps/nextapp/src/lib/auth/options.ts
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../mongodb';
import { User } from '../user-schema';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          console.log('[Production] Missing credentials');
          return null;
        }

        try {
          await dbConnect();
          console.log('[Production] Connected to DB, looking for user:', credentials.username);
          
          const user = await User.findOne({ username: credentials.username });
          
          if (!user) {
            console.log('[Production] User not found');
            return null;
          }

          const isValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isValid) {
            console.log('[Production] Invalid password');
            return null;
          }

          const userData = {
            id: user._id.toString(),
            username: user.username,
          };

          console.log('[Production] Auth successful:', userData);
          return userData;
        } catch (error) {
          console.error('[Production] Auth error:', error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('[Production] JWT Callback - Input:', { 
        hasUser: !!user, 
        hasAccount: !!account, 
        currentToken: token 
      });

      if (user) {
        token.id = user.id;
        token.username = user.username;
      }

      console.log('[Production] JWT Callback - Output:', token);
      return token;
    },
    async session({ session, token }) {
      console.log('[Production] Session Callback - Input:', { 
        hasToken: !!token, 
        currentSession: session 
      });

      if (token && session.user) {
        session.user.id = token.id;
        session.user.username = token.username;
      }

      console.log('[Production] Session Callback - Output:', session);
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/error',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
  logger: {
    error(code, metadata) {
      console.error('[Production] Error:', { code, metadata });
    },
    warn(code) {
      console.warn('[Production] Warning:', code);
    },
    debug(code, metadata) {
      console.log('[Production] Debug:', { code, metadata });
    },
  },
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token' 
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
};

export default authOptions;