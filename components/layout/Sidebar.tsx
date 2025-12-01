"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Upload, Users, FileText, User } from 'lucide-react';
import { SignOutButton } from '@/components/ui/SignOutButton';
import clsx from 'clsx';
import styles from './Sidebar.module.css';

interface SidebarProps {
    role: 'faculty' | 'student';
}

export default function Sidebar({ role }: SidebarProps) {
    const pathname = usePathname();

    const facultyLinks = [
        { href: '/faculty', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/faculty/reports', label: 'Reports', icon: FileText },
        { href: '/faculty/upload', label: 'Upload Attendance', icon: Upload },
        { href: '/faculty/students', label: 'Students', icon: Users },
    ];

    const studentLinks = [
        { href: '/student', label: 'My Attendance', icon: LayoutDashboard },
        { href: '/student/history', label: 'History', icon: FileText },
        { href: '/student/profile', label: 'Profile', icon: User },
    ];

    const links = role === 'faculty' ? facultyLinks : studentLinks;

    return (
        <aside className={styles.sidebar}>
            <div className={styles.logo}>
                <h2>Smart<span className={styles.accent}>Presence</span></h2>
            </div>

            <nav className={styles.nav}>
                {links.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={clsx(styles.link, isActive && styles.active)}
                        >
                            <Icon size={20} />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className={styles.footer}>
                <SignOutButton />
            </div>
        </aside>
    );
}
