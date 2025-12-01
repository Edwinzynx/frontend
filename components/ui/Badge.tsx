import React from 'react';
import clsx from 'clsx';
import styles from './Badge.module.css';

interface BadgeProps {
    children: React.ReactNode;
    variant?: 'success' | 'warning' | 'danger' | 'neutral';
    className?: string;
}

export function Badge({ children, variant = 'neutral', className }: BadgeProps) {
    return (
        <span className={clsx(styles.badge, styles[variant], className)}>
            {children}
        </span>
    );
}
