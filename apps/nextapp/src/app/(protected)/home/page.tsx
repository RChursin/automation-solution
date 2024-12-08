/* apps/nextapp/src/app/(protected)/home/page.tsx */

import { getServerSession } from 'next-auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../lib/auth/options';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import styles from './home.module.css';

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      {/* Add bg-background/95 here instead of @apply */}
      <header className={`${styles.header} bg-background/95`}>
        <div className="container flex justify-between items-center">
          <h1 className="text-3xl font-semibold text-foreground">Dashboard</h1>
          <p className="text-lg text-muted-foreground">
            Welcome back, {session.user.username}
          </p>
        </div>
      </header>

      <section className="p-6">
        <div className="container">
          {/* Add bg-background/60 here instead of @apply in .card */}
          <Card className={`rounded-lg p-6 bg-background/60 backdrop-blur border`}>
            <div className={styles.heroSection}>
              <div className="flex items-center justify-between">
                <h1 className={styles.heroTitle}>Welcome to The Source Build</h1>
                <Button variant="outline">Get Started</Button>
              </div>

              <p className={styles.heroSubtitle}>
                This is your centralized hub of The Source Build, where you can access all of our services and tools to help you build and deploy your applications and automation.
              </p>

              <div className={styles.imageContainer}>
                <Image src="/sputnik.png" width={500} height={500} alt="Sputnik" />
              </div>

              <div className={styles.cardGrid}>
                {/* For each card, we can just rely on .card since we moved bg colors to JSX above */}
                <Card className={`${styles.card} bg-background/60`}>
                  <CardHeader>
                    <CardTitle>Test Automation</CardTitle>
                    <CardDescription>End-to-end testing solutions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive testing frameworks and tools for automated testing across your applications.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`${styles.card} bg-background/60`}>
                  <CardHeader>
                    <CardTitle>CI/CD Integration</CardTitle>
                    <CardDescription>Seamless deployment workflows</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Integrated continuous integration and deployment pipelines for efficient delivery.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`${styles.card} bg-background/60`}>
                  <CardHeader>
                    <CardTitle>Monitoring</CardTitle>
                    <CardDescription>Real-time system insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Monitor your automation processes and system performance in real-time.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Card>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container flex flex-col gap-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>© 2024 The Source Build</p>
            <p>RChursin 💡</p>
          </div>
        </div>
      </footer>
    </>
  );
}
