'use client'

import { Eye, EyeClosed } from "phosphor-react";
import React, { useState } from "react";

interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
  type: "text" | "email" | "password";
  viewPassword?: boolean;
  setViewPassword?: (value: boolean) => void;
}

export function Input({
  value,
  onChange,
  placeholder,
  disabled,
  type,
}: InputProps) {

  const [viewPassword, setViewPassword] = useState(false)

  if (type === "password") {
    return (
      <div className="flex flex-col relative">
        <input
          type={viewPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className="border border-gray-400 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
        />
        <button
          type="button"
          onClick={() => setViewPassword(!viewPassword)}
          className="absolute right-2 top-[9px]"
        >
          {viewPassword ? (
            <EyeClosed size={18} color="#71717a"/>
          ) : (
            <Eye size={18} color="#71717a"/>
          )}
        </button>
        </div>
    );
  }
  return (
    <div className="flex flex-col">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="border border-gray-400 p-2 rounded-lg appearance-none focus:outline-none focus:border-gray-500"
      />
    </div>
  );
}