import React from 'react';
import clsx from 'clsx';
import { Loader2 } from 'lucide-react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'success';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export function Button({
    children,
    className,
    variant = 'primary',
    size = 'md',
    isLoading,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                styles.button,
                styles[variant],
                styles[size],
                className
            )}
            disabled={disabled || isLoading}
            {...props}
        >
            {isLoading && <Loader2 className={styles.spinner} size={16} />}
            {children}
        </button>
    );
}
