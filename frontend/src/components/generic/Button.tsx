import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'btn transition-all inline-flex items-center justify-center gap-2',
  {
    variants: {
      variant: {
        default: '',
        base: 'bg-green-600',
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        accent: 'btn-accent',
        ghost: 'btn-ghost',
        success: 'btn-success',
        warning: 'btn-warning',
        error: 'btn-error',
        info: 'btn-info',
        outline: 'btn-outline',
      },
      size: {
        default: '',
        xs: 'btn-xs',
        sm: 'btn-sm',
        md: 'btn-md',
        lg: 'btn-lg',
        wide: 'btn-wide',
        block: 'btn-block',
      },
      shape: {
        default: '',
        square: 'btn-square',
        circle: 'btn-circle',
      },
      state: {
        default: '',
        active: 'btn-active',
        disabled: 'btn-disabled',
        loading: 'loading',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
      shape: 'default',
      state: 'default',
    },
  },
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  icon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, shape, state, icon, children, ...props },
    ref,
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ variant, size, shape, state, className }),
        )}
        ref={ref}
        {...props}
      >
        {icon && <span>{icon}</span>}
        {children}
      </button>
    );
  },
);

export { Button };
