"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface DropdownOption {
  value: string;
  label: string;
  disabled?: boolean;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const Dropdown: React.FC<DropdownProps> = ({
  options,
  value,
  onChange,
  placeholder = "Select option",
  disabled = false,
  className,
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Update internal state when value prop changes
  useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue: string) => {
    setSelectedValue(optionValue);
    onChange?.(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find(
    (option) => option.value === selectedValue
  );

  return (
    <div className={cn("relative", className)} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={cn(
          "flex items-center justify-between w-full px-4 py-3 text-left border-2 rounded-xl transition-all duration-200",
          "focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500",
          "hover:border-gray-300 hover:bg-gray-50/50",
          isOpen && "border-blue-500 bg-blue-50/30",
          disabled && "opacity-50 cursor-not-allowed bg-gray-50",
          "bg-white border-gray-200"
        )}
      >
        <div className="flex items-center gap-3">
          {icon && <span className="text-gray-500">{icon}</span>}
          <span
            className={cn(
              "truncate",
              selectedValue ? "text-gray-900" : "text-gray-500"
            )}
          >
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-gray-400 transition-transform duration-200 flex-shrink-0",
            isOpen && "transform rotate-180"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />

          {/* Menu */}
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-lg z-20 max-h-64 overflow-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => !option.disabled && handleSelect(option.value)}
                disabled={option.disabled}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors duration-150",
                  "first:rounded-t-xl last:rounded-b-xl",
                  option.disabled && "opacity-50 cursor-not-allowed",
                  selectedValue === option.value && "bg-blue-50 text-blue-700"
                )}
              >
                <span className="truncate">{option.label}</span>
                {selectedValue === option.value && (
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
