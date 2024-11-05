'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

interface FeatureCardProps {
  title: string;
  description: string;
  content: string;
}

export function FeatureCard({ title, description, content }: FeatureCardProps) {
  return (
    <Card className="bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 transition-all hover:bg-background/80">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{content}</p>
      </CardContent>
    </Card>
  );
}
