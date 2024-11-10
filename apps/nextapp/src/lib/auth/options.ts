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
        email: { label: 'Email', type: 'email' },      // Only use email for login
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Check if credentials are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password');
        }

        try {
          await dbConnect();
          
          // Find user by email only
          const user = await User.findOne({ email: credentials.email });

          // If no user found with this email
          if (!user) {
            throw new Error('No account found with this email');
          }

          // Verify password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          
          if (!isValid) {
            throw new Error('Invalid password');
          }

          // Return user object with required fields
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username, // We still include username as it's part of the user model
          };
        } catch (error) {
          console.error('Auth error:', error);
          // For security, use generic error message in production
          const errorMessage = process.env.NODE_ENV === 'development' 
            ? (error as Error).message 
            : 'Invalid email or password';
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/error',
  },
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      // Send properties to the client
      if (session.user) {
        session.user.id = token.id as string;
        session.user.email = token.email as string;
        session.user.username = token.username as string;
      }
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
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
        domain: process.env.NODE_ENV === 'production' 
          ? '.thesource.build'  // Note the leading dot for subdomain support
          : 'localhost'
      }
    }
  },
  debug: process.env.NODE_ENV === 'development',
};

export default authOptions;