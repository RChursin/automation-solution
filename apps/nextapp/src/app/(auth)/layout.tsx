// src/app/(auth)/layout.tsx
export const metadata = {
  title: 'Auth | Automation Solutions',
  description: 'Authentication pages for Automation Solutions.',
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <main className="w-full max-w-md p-6">
        {children}
      </main>
    </div>
  );
}