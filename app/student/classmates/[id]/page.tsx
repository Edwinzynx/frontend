import { prisma } from "@/lib/prisma"
import ProfileCard from '@/components/student/ProfileCard';
import { Card } from '@/components/ui/Card';
import styles from './page.module.css';

export default async function StudentDetailPage({ params }: { params: { id: string } }) {
    const student = await prisma.student.findUnique({
        where: { id: params.id },
    });

    if (!student) return <div>Student not found</div>;

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
        </div>
    );
}
