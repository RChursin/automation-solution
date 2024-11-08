// apps/nextapp/src/app/(protected)/home/page.tsx
import { Metadata } from 'next';
import { Button } from '../../../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Separator } from '../../../components/ui/separator';

export const metadata: Metadata = {
  title: 'Home | Automation Solutions',
  description: 'Welcome to the home page of automation solutions.',
};

export default function Home() {
  return (
    <div className="flex flex-col bg-background">
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-6">
        <div className="container">
          <h2 className="text-2xl font-semibold text-foreground">Home Page Header</h2>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="container">
          <Card className="rounded-lg border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 p-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                  Welcome to Automation Solutions
                </h1>
                <Button variant="outline">Get Started</Button>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                This is your centralized automation hub. Access and manage all your automation
                solutions from one place, with seamless integration and powerful controls.
              </p>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                  <CardHeader>
                    <CardTitle>Test Automation</CardTitle>
                    <CardDescription>End-to-end testing solutions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Comprehensive testing frameworks and tools for automated testing across your
                      applications.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
                  <CardHeader>
                    <CardTitle>CI/CD Integration</CardTitle>
                    <CardDescription>Seamless deployment workflows</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">
                      Integrated continuous integration and deployment pipelines for efficient
                      delivery.
                    </p>
                  </CardContent>
                </Card>

                <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40">
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
      </main>

      <footer className="mt-auto border-t border-border bg-background p-6">
        <div className="container">
          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-foreground">Home Page Footer</h2>
            <Separator />
            <div className="flex justify-between text-sm text-muted-foreground">
              <p>© 2024 Automation Solutions</p>
              <p>Built with ❤️ by Cyber Junk1e</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}