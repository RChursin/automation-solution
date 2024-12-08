/* apps/nextapp/src/app/(auth)/layout.tsx */

import '../globals.css';
import styles from './layout.module.css';
import { Providers } from '../providers';

export const metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.authBody}>
        <Providers>
          <div className={styles.authWrapper}>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
