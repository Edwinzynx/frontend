import { Card } from '@/components/ui/Card';
import styles from './ProfileCard.module.css';

interface ProfileCardProps {
    student: {
        name: string;
        rollNo: string;
        section: string;
    };
}

export default function ProfileCard({ student }: ProfileCardProps) {
    return (
        <Card className={styles.card}>
            <div className={styles.header}>
                <div className={styles.info}>
                    <h2 className={styles.name}>{student.name}</h2>
                    <p className={styles.detail}>{student.rollNo} • Section {student.section}</p>
                </div>
            </div>
        </Card>
    );
}
