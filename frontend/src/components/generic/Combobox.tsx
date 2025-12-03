import { useEffect, useRef } from 'react';

interface ComboboxProps {
  setIsOpen: (isOpen: boolean) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputValue: string;
  children: React.ReactNode;
  placeholder?: string;
}

export const Combobox = ({
  setIsOpen,
  onChange,
  placeholder,
  inputValue,
  children,
}: ComboboxProps) => {
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
    <div className="relative mb-4" ref={dropdownRef}>
      <label className="floating-label">
        <input
          type="text"
          placeholder={placeholder}
          className="input input-bordered w-full"
          value={inputValue}
          onChange={(e) => onChange(e)}
          onClick={() => setIsOpen(true)}
          aria-haspopup="listbox"
          role="combobox"
        />
        <span>{placeholder}</span>
      </label>
      {children}
    </div>
  );
};
