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
        username: { 
          label: 'Username', 
          type: 'text',
          placeholder: 'Enter your username'
        },
        password: { 
          label: 'Password', 
          type: 'password',
          placeholder: 'Enter your password'
        },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error('Please provide both username and password');
        }

        try {
          await dbConnect();
          
          const user = await User.findOne({ 
            username: credentials.username 
          }).select('+password');

          if (!user) {
            throw new Error('Invalid username or password');
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password
          );
          
          if (!isValid) {
            throw new Error('Invalid username or password');
          }

          // Make sure to return the correct user ID
          return {
            id: user._id.toString(),
            username: user.username,
          };
        } catch (error) {
          console.error('Auth error here:', error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          username: token.username,
        };
      }
      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  pages: {
    signIn: '/login',
    error: '/error',
    signOut: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true, // Enable debug mode to see what's happening
};

export default authOptions;