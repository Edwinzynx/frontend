"use client";

import { useState } from 'react';
import styles from './ManualAttendanceForm.module.css';

export default function ManualAttendanceForm() {
    const [formData, setFormData] = useState({
        rollNo: '',
        date: new Date().toISOString().split('T')[0],
        status: 'PRESENT',
        subject: '',
        timeSlot: '',
    });
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        try {
            const response = await fetch('/api/attendance/manual', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to mark attendance');
            }

            setMessage({ type: 'success', text: 'Attendance marked successfully!' });
            // Reset form but keep date/subject/slot for convenience? Maybe just rollNo.
            setFormData(prev => ({ ...prev, rollNo: '' }));
        } catch (error: any) {
            setMessage({ type: 'error', text: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.grid}>
                <div className={styles.field}>
                    <label htmlFor="rollNo">Student Roll No</label>
                    <input
                        type="text"
                        id="rollNo"
                        value={formData.rollNo}
                        onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                        required
                        placeholder="e.g. 2023CS01"
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="status">Status</label>
                    <select
                        id="status"
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                        <option value="PRESENT">Present</option>
                        <option value="ABSENT">Absent</option>
                        <option value="LATE">Late</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <label htmlFor="subject">Subject</label>
                    <input
                        type="text"
                        id="subject"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="e.g. Data Structures"
                        required
                    />
                </div>

                <div className={styles.field}>
                    <label htmlFor="timeSlot">Time Slot</label>
                    <input
                        type="text"
                        id="timeSlot"
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                        placeholder="e.g. 10:00 AM - 11:00 AM"
                        required
                    />
                </div>
            </div>

            {message && (
                <div className={`${styles.message} ${styles[message.type]}`}>
                    {message.text}
                </div>
            )}

            <button type="submit" className={styles.submitButton} disabled={loading}>
                {loading ? 'Marking...' : 'Mark Attendance'}
            </button>
        </form>
    );
}
