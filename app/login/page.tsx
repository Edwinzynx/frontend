'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
        alert('Invalid credentials'); // Simple alert for now
        setIsLoading(false);
      } else {
        router.refresh(); 

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
        title={
          <span style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '40px' }}>
            <Image 
              src="/icon.png" 
              alt="SmartPresence Icon" 
              width={32}
              height={32}
              style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', height: '32px', width: 'auto' }} 
            />
            <span style={{ textAlign: 'center', padding: '0 50px', whiteSpace: 'nowrap', fontSize: '1.05rem' }}>
              Welcome Back to SmartPresence
            </span>
          </span>
        }
        description={
          <span style={{ display: 'block', textAlign: 'center', width: '100%' }}>
            Sign in to your account to continue
          </span>
        }
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
          <div className={styles.footer} style={{ marginTop: '0.5rem' }}>
            <Link href="/" className={styles.link} style={{ fontWeight: 500 }}>
              ← Back to Project Details
            </Link>
          </div>
        </form>
      </Card>
    </div>
  );
}
