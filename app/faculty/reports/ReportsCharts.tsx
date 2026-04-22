"use client";

import { Card } from '@/components/ui/Card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import styles from './page.module.css';

interface ReportsChartsProps {
    weeklyData: { name: string; present: number; absent: number }[];
    classPerformanceData: { range: string; count: number }[];
}

export default function ReportsCharts({ weeklyData, classPerformanceData }: ReportsChartsProps) {
    return (
        <div className={styles.container}>
            <Card title="Weekly Attendance Trend" description="Attendance counts for the current week">
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={weeklyData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' }}
                                cursor={{ fill: '#334155', opacity: 0.4 }}
                            />
                            <Bar dataKey="present" fill="#0ea5e9" name="Present" radius={[4, 4, 0, 0]} animationDuration={1500} animationEasing="ease-out" />
                            <Bar dataKey="absent" fill="#ef4444" name="Absent" radius={[4, 4, 0, 0]} animationDuration={1500} animationEasing="ease-out" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>

            <Card title="Class Performance Distribution" description="Number of students by overall attendance percentage">
                <div className={styles.chartWrapper}>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={classPerformanceData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                            <XAxis dataKey="range" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1e293b', borderRadius: '8px', border: '1px solid #334155', color: '#f8fafc', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)' }}
                                cursor={{ fill: '#334155', opacity: 0.4 }}
                            />
                            <Bar dataKey="count" fill="#10b981" name="Students" radius={[4, 4, 0, 0]} animationDuration={1500} animationEasing="ease-out" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </Card>
        </div>
    );
}
