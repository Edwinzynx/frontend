import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import ProfileCard from '@/components/student/ProfileCard';
import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

export default async function ProfilePage() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        redirect("/login")
    }

    const student = await prisma.student.findUnique({
        where: { userEmail: session.user.email },
    });

    if (!student) return <div>Student profile not found</div>;

    return (
        <div className={styles.container}>
            <ProfileCard student={student} />

            <Card title="Academic Details">
                <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Roll Number</span>
                        <span className={styles.value}>{student.rollNo}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Section</span>
                        <span className={styles.value}>{student.section}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Course</span>
                        <span className={styles.value}>{student.course}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Semester</span>
                        <span className={styles.value}>{student.semester}</span>
                    </div>
                </div>
            </Card>

            <Card title="Contact Information">
                <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Email</span>
                        <span className={styles.value}>{session.user.email}</span>
                    </div>
                    <div className={styles.detailItem}>
                        <span className={styles.label}>Phone</span>
                        <span className={styles.value}>{student.phoneNo}</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
