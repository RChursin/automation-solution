/* apps/nextapp/src/app/(protected)/layout.tsx */

import '../globals.css';
import { Sidebar } from '../../components/navigation/sidebar';
import styles from './layout.module.css';

export const metadata = {
  title: 'The Source Build',
};

export default function ProtectedLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <Sidebar />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  );
}