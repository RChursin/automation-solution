// src/app/(auth)/layout.tsx
// app/(auth)/layout.tsx (Auth layout)
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      {children}
    </div>
  );
}