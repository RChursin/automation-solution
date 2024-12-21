// apps/nextapp/src/types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    username: string;
    email: string; // Added email field
    image: string; // Added image field
  }

  interface Session {
    user: {
      id: string;
      username: string;
      email: string; // Added email field
      image: string; // Added image field
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
    email: string; // Added email field
  }
}