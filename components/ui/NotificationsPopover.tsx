"use client";

import React from 'react';
import { Bell } from 'lucide-react';
import styles from './NotificationsPopover.module.css';

interface Notification {
    id: string;
    message: string;
    time: string;
    read: boolean;
}

interface NotificationsPopoverProps {
    notifications: Notification[];
    onMarkAllRead: () => void;
    isOpen: boolean;
}

export default function NotificationsPopover({
    notifications,
    onMarkAllRead,
    isOpen
}: NotificationsPopoverProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.popover}>
            <div className={styles.header}>
                <h3 className={styles.title}>Notifications</h3>
                <button className={styles.markReadBtn} onClick={onMarkAllRead}>
                    Mark all as read
                </button>
            </div>

            <div className={styles.list}>
                {notifications.length === 0 ? (
                    <p className={styles.empty}>No notifications</p>
                ) : (
                    notifications.map((notification) => (
                        <div key={notification.id} className={`${styles.item} ${!notification.read ? styles.unread : ''}`}>
                            <div className={styles.icon}>
                                <Bell size={16} />
                            </div>
                            <div className={styles.content}>
                                <p className={styles.message}>{notification.message}</p>
                                <span className={styles.time}>{notification.time}</span>
                            </div>
                            {!notification.read && <div className={styles.dot} />}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
