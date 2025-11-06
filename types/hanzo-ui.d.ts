declare module '@hanzo/ui' {
  import { ComponentPropsWithoutRef, FC, ReactNode } from 'react';

  // Button component
  export const Button: FC<ComponentPropsWithoutRef<'button'> & {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    asChild?: boolean;
  }>;

  export function buttonVariants(config?: {
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    className?: string;
  }): string;

  // Card components
  export const Card: FC<ComponentPropsWithoutRef<'div'>>;
  export const CardHeader: FC<ComponentPropsWithoutRef<'div'>>;
  export const CardContent: FC<ComponentPropsWithoutRef<'div'>>;
  export const CardFooter: FC<ComponentPropsWithoutRef<'div'>>;

  // Input component
  export const Input: FC<ComponentPropsWithoutRef<'input'>>;

  // Label component
  export const Label: FC<ComponentPropsWithoutRef<'label'>>;

  // Utility function
  export function cn(...inputs: any[]): string;
}

declare module '@hanzo/ui/badge' {
  import { FC, ComponentPropsWithoutRef } from 'react';

  export const Badge: FC<ComponentPropsWithoutRef<'div'> & {
    variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  }>;
}