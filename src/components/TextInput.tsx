// src/Icon.tsx
import React from 'react';

interface TextInputProps {
  name: string;
  type?: 'text' | 'password';
  ariaLabel?: string;
  placeHolder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
const TextInput = ({
  name,
  ariaLabel,
  placeHolder,
  value,
  onChange,
  onBlur,
  type = 'text'
}: TextInputProps) => (
  <input
    type={type}
    name={name}
    aria-label={ariaLabel}
    placeholder={placeHolder}
    value={value}
    onChange={onChange}
    onBlur={onBlur}
    className='shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
  />
);

export default TextInput;