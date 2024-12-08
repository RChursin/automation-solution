/* apps/nextapp/src/app/(protected)/projects/page.tsx */

import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { FolderGit2, GitBranch, GitPullRequest } from 'lucide-react';
import styles from './projects.module.css';

export default function ProjectsPage() {
  return (
    <>
      {/* Add bg-background/95 here instead of in @apply */}
      <header className={`${styles.header} bg-background/95`}>
        <div className="container">
          <h2 className={styles.title}>Projects Dashboard</h2>
        </div>
      </header>

      <section className={styles.projectsSection}>
        <div className="container">
          {/* Add bg-background/60 here for contentCard */}
          <Card className={`${styles.contentCard} bg-background/60`}>
            <div className={styles.cardInner}>
              <div className={styles.headerRow}>
                <h1 className={styles.heroTitle}>Project Dashboard</h1>
                <Button>
                  New Project
                  <FolderGit2 className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className={styles.description}>
                Manage and monitor your automation projects. Track progress, view statistics, and
                manage workflows from a centralized dashboard.
              </p>

              <div className={styles.cardGrid}>
                {/* Add bg-background/60 and hover:bg-background/70 directly in JSX for projectCard */}
                <Card className={`${styles.projectCard} bg-background/60 hover:bg-background/70`}>
                  <CardHeader>
                    <GitBranch className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Active Projects</CardTitle>
                    <CardDescription>Current automation workflows</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      View and manage your active automation projects and their current status.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`${styles.projectCard} bg-background/60 hover:bg-background/70`}>
                  <CardHeader>
                    <GitPullRequest className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Project Templates</CardTitle>
                    <CardDescription>Quick start templates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Choose from pre-configured templates to quickly start new automation projects.
                    </p>
                  </CardContent>
                </Card>

                <Card className={`${styles.projectCard} bg-background/60 hover:bg-background/70`}>
                  <CardHeader>
                    <FolderGit2 className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Project Analytics</CardTitle>
                    <CardDescription>Performance metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Track project performance, success rates, and resource utilization.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Card>

          <div className={styles.stats}>
            <p>Active Projects: 5</p>
            <p>Last Updated: Today</p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>© 2024 The Source Build</p>
            <p>RChursin 💡</p>
          </div>
        </div>
      </footer>
    </>
  );
}
