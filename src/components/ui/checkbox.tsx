import { forwardRef, useRef, type InputHTMLAttributes } from "react";
import "./checkbox.css";

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  className?: string;
  onChange: () => void;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className = "", onChange, ...props }, ref) => {
    // Create a local ref if external ref is not provided
    const innerRef = useRef<HTMLInputElement>(null);
    const inputRef = (ref || innerRef) as React.RefObject<HTMLInputElement>;

    const handleClick = (e: React.MouseEvent) => {
      if (e.target instanceof HTMLInputElement) {
        return;
      }

      if (inputRef.current) {
        onChange();
      }
    };

    return (
      <div className="checkbox-wrapper" onClick={handleClick}>
        {label && label}
        <label>
          <input
            className={`checkbox ${className}`}
            type="checkbox"
            ref={innerRef}
            // onChange={onChange}
            {...props}
          />
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="checkmark"
          >
            <path
              d="M6 12L10 16L18 8"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </label>
      </div>
    );
  }
);
