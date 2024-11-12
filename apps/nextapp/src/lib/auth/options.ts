// apps/nextapp/src/lib/auth/options.ts
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import dbConnect from '../mongodb';
import { User } from '../user-schema';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
  providers: [
    // CredentialsProvider for custom email and password authentication
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Ensure both email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Please provide both email and password');
        }

        try {
          // Connect to the database and look for the user by email
          await dbConnect();
          const user = await User.findOne({ email: credentials.email });

          // If no user found, throw an error
          if (!user) {
            throw new Error('No account found with this email');
          }

          // Compare provided password with the stored hashed password
          const isValid = await bcrypt.compare(credentials.password, user.password);
          if (!isValid) {
            throw new Error('Invalid password');
          }

          // Return user data if authentication is successful
          return {
            id: user._id.toString(),
            email: user.email,
            username: user.username,
          };
        } catch (error) {
          console.error('Auth error:', error);
          const errorMessage = process.env.NODE_ENV === 'development' 
            ? (error as Error).message 
            : 'Invalid email or password';
          throw new Error(errorMessage);
        }
      },
    }),
  ],
  pages: {
    // Custom page routes for sign-in and errors
    signIn: '/login',
    error: '/error',
  },
  callbacks: {
    // JWT callback to store and update user data in the token
    async jwt({ token, user }) {
      // Initial sign in: add user data to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.username = user.username;
      } else if (token.id) {
        // Retrieve updated user data from the database if necessary
        await dbConnect();
        const updatedUser = await User.findById(token.id);
        if (updatedUser) {
          token.email = updatedUser.email;
          token.username = updatedUser.username;
        }
      }
      return token;
    },
    // Session callback to make token data available in session
    async session({ session, token }) {
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
    maxAge: 24 * 60 * 60, // Session expiration time set to 24 hours
  },
  cookies: {
    sessionToken: {
      // Cookie configuration for secure environments
      name: process.env.NODE_ENV === 'production' 
        ? '__Secure-next-auth.session-token'
        : 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        domain: process.env.NODE_ENV === 'production' 
          ? '.thesource.build'
          : 'localhost'
      }
    }
  },
  debug: process.env.NODE_ENV === 'development', // Enable debug logging in development
};

export default authOptions;