// apps/nextapp/src/lib/auth-utils.ts
import { getServerSession } from 'next-auth';
import { authOptions } from './auth/options';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }
  
  return session.user;
}