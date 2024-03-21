import React from 'react';
type InputPropsTypes ={
  className?: string;
  type?: string;
  checked?: boolean;
  value?: string,
  onChange: (event: React.ChangeEvent<HTMLInputElement>)=> void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>)=> void;
  tabIndex?: number;
  placeholder?: string;
}

export default function Input ({
  className,
  type,
  checked,
  value,
  onChange,
  onKeyDown,
  tabIndex,
  placeholder
}: InputPropsTypes)  {
  return (
    <input
      className={className}
      type={type}
      checked={checked}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      tabIndex={tabIndex}
      placeholder={placeholder}
    />
  )
}

