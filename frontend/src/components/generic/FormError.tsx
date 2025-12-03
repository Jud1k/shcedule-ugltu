import { HTMLAttributes } from 'react';

interface FormErrorProps extends HTMLAttributes<HTMLDivElement> {
  message: string;
}

export const FormError = ({ message, ...props }: FormErrorProps) => {
  return (
    <div className="label" {...props}>
      <span className="label-text-alt text-error">{message}</span>
    </div>
  );
};
