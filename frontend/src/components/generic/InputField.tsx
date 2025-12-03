import { ChangeEventHandler } from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export default function InputField({
  label,
  value,
  onChange,
}: InputFieldProps) {
  return (
    <label className="floating-label">
      <input
        type="text"
        placeholder={label}
        value={value}
        className="input input-lg w-full mb-2"
        onChange={onChange}
      />
      <span>{label}</span>
    </label>
  );
}
