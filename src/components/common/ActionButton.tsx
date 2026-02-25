'use client';

import type { ComponentPropsWithoutRef } from 'react';

import { Button } from '@/components/ui/button';

import { cn } from '@/lib/utils';

type ButtonBaseProps = ComponentPropsWithoutRef<typeof Button>;

interface ActionButtonProps extends ButtonBaseProps {
  active?: boolean;
  activeClassName?: string;
}

export default function ActionButton({
  active = false,
  activeClassName,
  className,
  children,
  ...props
}: ActionButtonProps) {
  return (
    <Button
      {...props}
      variant={active ? 'secondary' : 'outline'}
      className={cn(className, active && activeClassName)}
    >
      {children}
    </Button>
  );
}
