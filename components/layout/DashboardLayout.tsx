"use client";

import Sidebar from './Sidebar';
import Navbar from './Navbar';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
    children: React.ReactNode;
    role: 'faculty' | 'student';
    title: string;
    user?: {
        name: string;
        role: string;
    };
}

export default function DashboardLayout({ children, role, title, user }: DashboardLayoutProps) {
    return (
        <div className={styles.container}>
            <Sidebar role={role} />
            <div className={styles.mainContent}>
                <Navbar title={title} user={user} />
                <main className={styles.pageContent}>
                    {children}
                </main>
            </div>
        </div>
    );
}
