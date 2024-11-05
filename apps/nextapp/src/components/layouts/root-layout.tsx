import { Sidebar } from '../layouts/sidebar';

interface RootLayoutProps {
  children: React.ReactNode;
}

export function RootLayout({ children }: RootLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 pl-64">
        <div className="container mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
