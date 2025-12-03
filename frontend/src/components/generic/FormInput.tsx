import { UseFormRegisterReturn } from 'react-hook-form';
import { FormError } from './FormError';
import { cn } from '@/lib/utils';
import { InputHTMLAttributes } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  registration?: Partial<UseFormRegisterReturn>;
  type?: string;
  placeholder?: string;
  errorText?: string;
  className?: string;
}

export const FormInput = ({
  label,
  type = 'text',
  placeholder,
  errorText,
  registration,
  className,
  ...props
}: FormInputProps) => {
  return (
    <div className={cn('form-control w-full', className)}>
      <label className="label">
        <span className="label-text text-lg font-bold">{label}</span>
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          'input input-bordered w-full mt-2',
          errorText && 'input-error',
        )}
        {...registration}
        {...props}
      ></input>
      {errorText && <FormError message={errorText} />}
    </div>
  );
};
