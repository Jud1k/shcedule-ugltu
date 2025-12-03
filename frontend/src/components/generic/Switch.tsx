import { cn } from '@/lib/utils';
import React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  registration?: Partial<UseFormRegisterReturn>;
}

export default function Switch({
  className,
  registration,
  ...props
}: SwitchProps) {
  return (
    <input
      type="checkbox"
      className={cn('toggle', className)}
      {...registration}
      {...props}
    />
  );
}
