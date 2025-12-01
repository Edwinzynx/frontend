"use client";

import { useState, useRef, useEffect } from 'react';
import { Bell, User } from 'lucide-react';
import NotificationsPopover from '@/components/ui/NotificationsPopover';
import styles from './Navbar.module.css';

interface NavbarProps {
    title: string;
    user?: {
        name: string;
        role: string;
    };
}

export default function Navbar({ title, user }: NavbarProps) {
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState<{ id: string, message: string, time: string, read: boolean }[]>([]);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            if (user?.role === 'Faculty') {
                setNotifications([
                    { id: '1', message: 'Weekly attendance report generated.', time: '10 mins ago', read: false },
                    { id: '2', message: 'System maintenance scheduled for tonight.', time: '2 hours ago', read: true },
                    { id: '3', message: 'Low attendance alert: 3 students below 75%.', time: '1 day ago', read: false },
                ]);
            } else {
                setNotifications([
                    { id: '1', message: 'Your attendance for CS101 was marked Present.', time: '2 mins ago', read: false },
                    { id: '2', message: 'New assignment uploaded for CS102.', time: '1 hour ago', read: false },
                    { id: '3', message: 'Low attendance warning for CS103.', time: '1 day ago', read: true },
                ]);
            }
        }, 0);
        return () => clearTimeout(timer);
    }, [user?.role]);

    const unreadCount = notifications.filter(n => !n.read).length;

    const toggleNotifications = () => setIsNotificationsOpen(!isNotificationsOpen);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    // Close on click outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className={styles.navbar}>
            <h1 className={styles.title}>{title}</h1>

            <div className={styles.actions}>
                <div className={styles.notificationWrapper} ref={containerRef}>
                    <button className={styles.iconButton} onClick={toggleNotifications}>
                        <Bell size={20} />
                        {unreadCount > 0 && <span className={styles.badge}>{unreadCount}</span>}
                    </button>

                    <NotificationsPopover
                        notifications={notifications}
                        onMarkAllRead={markAllAsRead}
                        isOpen={isNotificationsOpen}
                    />
                </div>

                <div className={styles.profile}>
                    <div className={styles.avatar}>
                        <User size={20} />
                    </div>
                    <div className={styles.userInfo}>
                        <span className={styles.name}>{user?.name || 'User'}</span>
                        <span className={styles.role}>{user?.role || 'Role'}</span>
                    </div>
                </div>
            </div>
        </header>
    );
}
