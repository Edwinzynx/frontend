"use client";

import { Card } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import styles from './page.module.css';

// Mock data for the charts
const weeklyData = [
    { name: 'Mon', present: 45, absent: 5 },
    { name: 'Tue', present: 42, absent: 8 },
    { name: 'Wed', present: 48, absent: 2 },
    { name: 'Thu', present: 40, absent: 10 },
    { name: 'Fri', present: 46, absent: 4 },
];

const classPerformanceData = [
    { range: '90-100%', count: 15 },
    { range: '80-89%', count: 20 },
    { range: '70-79%', count: 10 },
    { range: '60-69%', count: 3 },
    { range: '<60%', count: 2 },
];

export default function ReportsPage() {
    return (
        <div className={styles.container}>
            <Card title="Weekly Attendance Trend" description="Attendance counts for the current week">
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                cursor={{ fill: '#f3f4f6' }}
                            />
                            <Bar dataKey="present" fill="#3b82f6" name="Present" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card title="Class Performance Distribution" description="Number of students by attendance percentage">
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={classPerformanceData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="range" />
                            <YAxis />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                                cursor={{ fill: '#f3f4f6' }}
                            />
                            <Bar dataKey="count" fill="#10b981" name="Students" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}
