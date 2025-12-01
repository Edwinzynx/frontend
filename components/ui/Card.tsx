import React from 'react';
import clsx from 'clsx';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    title?: string;
    description?: string;
    children: React.ReactNode;
}

export function Card({ title, description, children, className, ...props }: CardProps) {
    return (
        <div className={clsx(styles.card, className)} {...props}>
            {(title || description) && (
                <div className={styles.header}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {description && <p className={styles.description}>{description}</p>}
                </div>
            )}
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}
