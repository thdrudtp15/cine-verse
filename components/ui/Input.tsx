import React, { forwardRef } from 'react';

type InputProps = {
    className?: string;
    placeholder?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    ref?: React.RefObject<HTMLInputElement | null> | null;
};

const Input = React.memo(
    forwardRef<HTMLInputElement, Omit<InputProps, 'ref'>>(
        ({ className = '', placeholder = '', value, onChange, onBlur, ...props }, ref) => {
            return (
                <input
                    ref={ref}
                    className={`w-full px-4 py-3 rounded-lg bg-background-elevated border border-border text-foreground placeholder:text-foreground-muted transition-all duration-300 outline-none hover:border-border-hover focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20 ${className}`}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    {...props}
                />
            );
        }
    )
);

Input.displayName = 'Input';

export default Input;
