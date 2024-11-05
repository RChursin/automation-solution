import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface IconProps {
  icon: LucideIcon;
  className?: string;
}

export function Icon({ icon: Icon, className }: IconProps) {
  return <Icon className={cn('h-5 w-5', className)} />;
}
