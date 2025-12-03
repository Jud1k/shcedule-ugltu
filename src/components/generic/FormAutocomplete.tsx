import React, { useEffect, useRef } from 'react';
import { FormError } from './FormError';
import { cn } from '@/lib/utils';

interface FormComboboxProps {
  setIsOpen: (isOpen: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  placeholder?: string;
  errorText?: string;
  inputValue: string;
  children: React.ReactNode;
}

export const FormAutocomplete = ({
  setIsOpen,
  onChange,
  label,
  placeholder,
  errorText,
  inputValue,
  children,
}: FormComboboxProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [setIsOpen]);

  return (
    <div className="relative w-full">
      {errorText ? (
        <FormError message={errorText} />
      ) : (
        <label className="label">
          <span className="label-text text-lg font-bold">{label}</span>
        </label>
      )}
      <div ref={dropdownRef}>
        <input
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => {
            onChange(e);
          }}
          className={cn(
            'input input-bordered w-full mt-2',
            errorText && 'input-error',
          )}
          type="search"
          onClick={() => setIsOpen(true)}
          onFocus={() => setIsOpen(true)}
        />
        {children}
      </div>
    </div>
  );
};
