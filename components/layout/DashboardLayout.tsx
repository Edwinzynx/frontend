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
    const bgImage = role === 'student' ? '/classroom_bg.png' : '/faculty_bg.png';

    return (
        <div className={styles.container}>
            {/* Fixed Background Layer */}
            <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                zIndex: -1,
                backgroundImage: `linear-gradient(var(--bg-overlay), var(--bg-overlay)), url(${bgImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                pointerEvents: 'none'
            }} />

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
