/* apps/nextapp/src/app/(protected)/projects/page.tsx */

import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { FolderGit2, GitBranch, GitPullRequest } from 'lucide-react';
import styles from './projects.module.css';

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className={`${styles.header} bg-background/95`}>
        <div className="container mx-auto">
          <h2 className={styles.title}>Projects Dashboard</h2>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 py-10">
        <div className="container mx-auto px-6">
          {/* Content Card */}
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
                {/* Apply bg-background/60 and hover:bg-background/70 here for each projectCard */}
                <Card className={`${styles.projectCard} bg-background/60 hover:bg-background/70 p-4 transition-colors`}>
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

                <Card className={`${styles.projectCard} bg-background/60 hover:bg-background/70 p-4 transition-colors`}>
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

                <Card className={`${styles.projectCard} bg-background/60 hover:bg-background/70 p-4 transition-colors`}>
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
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container mx-auto flex justify-between text-sm text-muted-foreground">
          <p>© 2024 The Source Build</p>
          <p>RChursin 💡</p>
        </div>
      </footer>
    </div>
  );
}
