import { cn } from '@/lib/utils';

type BadgeVariant =
  | 'default'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'error';

type BadgeSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-green-600 text-base-content',
  primary: 'badge-primary text-white',
  secondary: 'badge-secondary text-white',
  accent: 'badge-accent text-white',
  neutral: 'badge-neutral text-white',
  success: 'badge-success text-white',
  warning: 'badge-warning text-white',
  error: 'badge-error text-white',
  info: 'badge-info text-white',
};

const sizeStyles: Record<BadgeSize, string> = {
  xs: 'badge-xd',
  sm: 'badge-sm',
  md: 'badge-md',
  lg: 'badge-lg',
  xl: 'badge-xl',
};

export default function Badge({
  children,
  className,
  variant = 'default',
  size = 'md',
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(
        'badge inline-flex items-center font-medium self-start',
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
