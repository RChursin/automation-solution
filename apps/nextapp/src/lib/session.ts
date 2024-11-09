import { getServerSession } from 'next-auth/next';
import authOptions from '../lib/auth/options'; // Ensure this path points to your `authOptions`

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session;
}
