'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import styles from '../auth.module.css';

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const result = await signIn('credentials', {
                redirect: false,
                email: formData.email,
                password: formData.password,
            });

            if (result?.error) {
                alert('Invalid credentials');
                setIsLoading(false);
            } else {
                router.refresh();
                // Redirect based on email heuristic for now, middleware will enforce later
                if (formData.email.includes('faculty') || formData.email.includes('admin')) {
                    router.push('/faculty');
                } else {
                    router.push('/student');
                }
            }
        } catch (error) {
            console.error('Login error:', error);
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Card
                title="Welcome Back"
                description="Sign in to SmartPresence"
                className={styles.card}
            >
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="email" className={styles.label}>Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="name@example.com"
                            className={styles.input}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                        />
                    </div>

                    <div className={styles.inputGroup}>
                        <label htmlFor="password" className={styles.label}>Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            className={styles.input}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                        />
                    </div>

                    <Button type="submit" isLoading={isLoading} className="w-full">
                        Sign In
                    </Button>

                    <div className={styles.footer}>
                        Don&apos;t have an account?{' '}
                        <Link href="/register" className={styles.link}>
                            Sign up
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}
