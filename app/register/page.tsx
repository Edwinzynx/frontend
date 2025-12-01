'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import styles from '../auth.module.css';

export default function RegisterPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'student',
        rollNo: '',
        section: '',
        course: '',
        semester: '',
        shapeId: 'Circle',
        phoneNo: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const res = await fetch('/api/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            // Redirect to login
            router.push('/');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <Card
                title="Create Account"
                description="Sign up for SmartPresence"
                className={styles.card}
            >
                <form onSubmit={handleSubmit} className={styles.form}>
                    {error && <div className="text-red-500 text-sm text-center">{error}</div>}

                    <div className={styles.inputGroup}>
                        <label htmlFor="name" className={styles.label}>Full Name</label>
                        <input
                            id="name"
                            type="text"
                            placeholder="John Doe"
                            className={styles.input}
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                        />
                    </div>

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

                    <div className={styles.inputGroup}>
                        <label htmlFor="role" className={styles.label}>I am a...</label>
                        <select
                            id="role"
                            className={styles.input}
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                        >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                        </select>
                    </div>

                    {formData.role === 'student' && (
                        <>
                            <div className={styles.inputGroup}>
                                <label htmlFor="rollNo" className={styles.label}>Roll Number</label>
                                <input
                                    id="rollNo"
                                    type="text"
                                    placeholder="CS101"
                                    className={styles.input}
                                    value={formData.rollNo}
                                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className={styles.inputGroup}>
                                    <label htmlFor="section" className={styles.label}>Section</label>
                                    <input
                                        id="section"
                                        type="text"
                                        placeholder="A"
                                        className={styles.input}
                                        value={formData.section}
                                        onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                                        required
                                    />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label htmlFor="semester" className={styles.label}>Semester</label>
                                    <input
                                        id="semester"
                                        type="text"
                                        placeholder="1"
                                        className={styles.input}
                                        value={formData.semester}
                                        onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                                        required
                                    />
                                </div>
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="course" className={styles.label}>Course</label>
                                <input
                                    id="course"
                                    type="text"
                                    placeholder="B.Tech"
                                    className={styles.input}
                                    value={formData.course}
                                    onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="phoneNo" className={styles.label}>Phone Number</label>
                                <input
                                    id="phoneNo"
                                    type="tel"
                                    placeholder="1234567890"
                                    className={styles.input}
                                    value={formData.phoneNo}
                                    onChange={(e) => setFormData({ ...formData, phoneNo: e.target.value })}
                                    required
                                />
                            </div>
                            <div className={styles.inputGroup}>
                                <label htmlFor="shapeId" className={styles.label}>Visual Shape</label>
                                <select
                                    id="shapeId"
                                    className={styles.input}
                                    value={formData.shapeId}
                                    onChange={(e) => setFormData({ ...formData, shapeId: e.target.value })}
                                >
                                    <option value="Circle">Circle</option>
                                    <option value="Square">Square</option>
                                    <option value="Triangle">Triangle</option>
                                    <option value="Pentagon">Pentagon</option>
                                    <option value="Hexagon">Hexagon</option>
                                </select>
                            </div>
                        </>
                    )}

                    <Button type="submit" isLoading={isLoading} className="w-full">
                        Create Account
                    </Button>

                    <div className={styles.footer}>
                        Already have an account?{' '}
                        <Link href="/" className={styles.link}>
                            Sign in
                        </Link>
                    </div>
                </form>
            </Card>
        </div>
    );
}
