import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ProfileCard from '@/components/student/ProfileCard';
import AttendanceStats from '@/components/student/AttendanceStats';
import styles from './page.module.css';

export default async function StudentDashboard() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        redirect("/login")
    }

    const student = await prisma.student.findUnique({
        where: { userEmail: session.user.email },
        include: { attendance: true }
    });

    if (!student) {
        return <div className={styles.container}>Student profile not found. Please contact administration.</div>;
    }

    // Calculate stats dynamically
    const records = student.attendance;
    const totalSessions = records.length > 0 ? records.length : 1; // Avoid division by zero in stats component if needed

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Student Dashboard</h1>
            </div>
            <div className={styles.grid}>
                <div className={styles.column}>
                    <ProfileCard student={student} />
                </div>

                <div className={styles.column}>
                    <AttendanceStats records={records} totalSessions={totalSessions} />
                </div>
            </div>
        </div>
    );
}
