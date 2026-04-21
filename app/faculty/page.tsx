import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

export default async function FacultyDashboard() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        redirect("/login")
    }

    // Fetch all students count
    const totalStudents = await prisma.student.count();

    // Fetch today's attendance
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendanceRecords = await prisma.attendance.findMany({
        where: {
            date: {
                gte: today,
            },
        },
    });

    const presentCount = attendanceRecords.filter((r: any) => r.status === 'PRESENT').length;
    const absentCount = attendanceRecords.filter((r: any) => r.status === 'ABSENT').length;
    // Late counts as present for rate calculation usually, or separate. Let's assume Present + Late / Total
    const presentOrLateCount = attendanceRecords.filter((r: any) => r.status === 'PRESENT' || r.status === 'LATE').length;

    const attendanceRate = totalStudents > 0 ? (presentOrLateCount / totalStudents) * 100 : 0;

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div>
                    <h1 className={styles.title}>Faculty Dashboard</h1>
                    <p className={styles.subtitle}>Welcome, {session.user.name || 'Faculty'}</p>
                </div>
            </div>

            <div className={styles.grid}>
                <Card title="Today's Attendance" className={styles.card}>
                    <div className={styles.stat}>
                        <span className={styles.value}>{attendanceRate.toFixed(1)}%</span>
                        <span className={styles.label}>Attendance Rate</span>
                    </div>
                </Card>

                <Card title="Present" className={styles.card}>
                    <div className={styles.stat}>
                        <span className={styles.value}>{presentCount}</span>
                        <span className={styles.label}>Students Present</span>
                    </div>
                </Card>

                <Card title="Absent" className={styles.card}>
                    <div className={styles.stat}>
                        <span className={styles.value}>{absentCount}</span>
                        <span className={styles.label}>Students Absent</span>
                    </div>
                </Card>
            </div>
        </div>
    );
}
