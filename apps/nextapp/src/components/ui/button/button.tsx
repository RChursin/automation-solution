/* apps/nextapp/src/components/ui/button.tsx */

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../../lib/utils';
import styles from './button.module.css';

const buttonVariants = cva(styles.buttonBase, {
  variants: {
    variant: {
      default: styles['variant-default'],
      destructive: styles['variant-destructive'],
      outline: styles['variant-outline'],
      secondary: styles['variant-secondary'],
      ghost: styles['variant-ghost'],
      link: styles['variant-link'],
      sidebar: styles['variant-sidebar'], // using the CSS class for sidebar variant
    },
    size: {
      default: styles['size-default'],
      sm: styles['size-sm'],
      lg: styles['size-lg'],
      icon: styles['size-icon'],
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };