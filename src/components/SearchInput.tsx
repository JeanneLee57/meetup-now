'use client';

import { ChangeEvent } from 'react';

interface SearchInputProps {
  required?: boolean;
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SearchInput = ({
  value,
  onChange,
  placeholder = '장소를 검색해주세요',
  required = false,
  className = '',
}: SearchInputProps) => {
  return (
    <input
      className={`w-full p-3 rounded-md border border-border focus:outline-none ${className}`}
      placeholder={placeholder}
      required={required}
      type="text"
      value={value}
      onChange={onChange}
    />
  );
};

export default SearchInput;
