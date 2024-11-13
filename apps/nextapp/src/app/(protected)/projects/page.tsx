// apps/nextapp/src/app/projects/page.tsx
import { Metadata } from 'next';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
// import { Separator } from '../../../components/ui/separator'; // If need to split the content
import { FolderGit2, GitBranch, GitPullRequest } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Projects | Automation Solutions',
  description: 'Manage your automation projects and workflows.',
};

export default function ProjectsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6">
        <div className="container">
          <h2 className="text-2xl font-semibold text-foreground">Projects Page Header</h2>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="container">
          <Card className="rounded-lg border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Project Dashboard
                </h1>
                <Button>
                  New Project
                  <FolderGit2 className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Manage and monitor your automation projects. Track progress, view statistics, and
                manage workflows from a centralized dashboard.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
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

                <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
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

                <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
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
            <br />          
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>Active Projects: 5</p>
              <p>Last Updated: Today</p>
            </div>
        </div>
      </main>

      {/* Footer */}
     <footer className="border-t border-border bg-background p-6">
        <div className="container">
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>© 2024 The Source Build</p>
            <p>Built with ❤️ by Cyber_Junk1e</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
