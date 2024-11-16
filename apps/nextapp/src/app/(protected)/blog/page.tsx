// apps/nextapp/src/app/blog/page.tsx
import { Metadata } from 'next';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
// import { Separator } from '../../../components/ui/separator'; // If need to split the content
import { BookOpen, Pencil, Tags, Bookmark } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | Automation Solutions',
  description: 'Discover insights and updates about automation solutions.',
};

export default function BlogPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6">
        <div className="container">
          <h2 className="text-2xl font-semibold text-foreground">Blog Page Header</h2>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="container">
          <Card className="rounded-lg border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Blog & Articles
                </h1>
                <Button>
                  New Post
                  <Pencil className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                Explore the latest updates, tutorials, and insights about automation testing and
                development.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                  <CardHeader>
                    <BookOpen className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Getting Started with Automation</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Tags className="h-4 w-4" />
                      Tutorials, Beginners
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Learn the basics of automation testing and how to set up your first test
                      suite.
                    </p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>5 min read</span>
                      <span>2 days ago</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                  <CardHeader>
                    <Bookmark className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Best Practices for CI/CD</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Tags className="h-4 w-4" />
                      DevOps, Advanced
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Discover the best practices for setting up continuous integration and
                      deployment pipelines.
                    </p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>8 min read</span>
                      <span>1 week ago</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                  <CardHeader>
                    <BookOpen className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>Advanced Testing Patterns</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Tags className="h-4 w-4" />
                      Testing, Expert
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Explore advanced patterns and strategies for effective test automation.
                    </p>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>12 min read</span>
                      <span>2 weeks ago</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </Card>
          <br />
          <div className="flex justify-between text-sm text-muted-foreground">
              <p>Total Posts: 15</p>
              <p>Last Updated: Today</p>
            </div>
        </div>
      </main>

     {/* Footer */}
     <footer className="border-t border-border bg-background p-6">
        <div className="container">
          <div className="flex justify-between text-sm text-muted-foreground">
            <p>© 2024 The Source Build</p>
            <p>RChursin 💡</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
