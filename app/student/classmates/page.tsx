import Link from 'next/link';
import { Card } from '@/components/ui/Card';
import ShapeAvatar from '@/components/student/ShapeAvatar';
import { db } from '@/lib/db';
import styles from './page.module.css';

export default async function ClassmatesPage() {
    const students = await db.getStudents();

    return (
        <Card title="Classmates Directory">
            <div className={styles.grid}>
                {students.map((student) => (
                    <Link key={student.id} href={`/student/classmates/${student.id}`} className={styles.link}>
                        <div className={styles.studentRow}>
                            <div className={styles.avatarWrapper}>
                                <ShapeAvatar shape={student.shape} color={student.color} size={40} />
                            </div>
                            <div className={styles.info}>
                                <p className={styles.name}>{student.name}</p>
                                <p className={styles.detail}>{student.rollNumber}</p>
                            </div>
                            <div className={styles.meta}>
                                <span className={styles.section}>Sec {student.section}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </Card>
    );
}
