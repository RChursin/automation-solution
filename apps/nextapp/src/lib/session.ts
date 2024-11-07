import { getServerSession } from 'next-auth'; // If using NextAuth.js
import { authOptions } from '../lib/auth/options'; // Adjust path as necessary

export async function getSession(request: Request) {
  const session = await getServerSession(authOptions);
  return session;
}