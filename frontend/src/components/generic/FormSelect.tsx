import { cn } from '@/lib/utils';
import { UseFormRegisterReturn } from 'react-hook-form';
import { FormError } from './FormError';
import { SelectHTMLAttributes } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  className?: string;
  children: React.ReactNode;
  registration?: Partial<UseFormRegisterReturn>;
  errorText?: string;
}

export default function FormSelect({
  className,
  label,
  children,
  registration,
  errorText,
  ...props
}: SelectProps) {
  return (
    <div className="form-control w-full">
      <label className="label">
        <span className="label-text text-lg font-bold">{label}</span>
      </label>
      <select
        className={cn(
          'select w-full mt-2',
          errorText && 'select-error',
          className,
        )}
        {...registration}
        {...props}
      >
        {children}
      </select>
      {errorText && <FormError message={errorText} />}
    </div>
  );
}
