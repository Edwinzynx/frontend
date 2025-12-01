import { Card } from '@/components/ui/Card';
import ShapeAvatar from './ShapeAvatar';
// import { Student } from '@/lib/types'; // Remove this, use local interface or Prisma type
import styles from './ProfileCard.module.css';

interface ProfileCardProps {
    student: {
        name: string;
        rollNo: string;
        section: string;
        shapeId: string;
        // color is not in DB, we'll derive it
    };
}

const getShapeColor = (shape: string) => {
    const colors: Record<string, string> = {
        'Circle': '#3B82F6', // Blue
        'Square': '#EF4444', // Red
        'Triangle': '#10B981', // Green
        'Pentagon': '#F59E0B', // Yellow
        'Hexagon': '#8B5CF6', // Purple
    };
    return colors[shape] || '#6B7280'; // Default gray
};

export default function ProfileCard({ student }: ProfileCardProps) {
    const color = getShapeColor(student.shapeId);

    return (
        <Card className={styles.card}>
            <div className={styles.header}>
                <div className={styles.avatarWrapper}>
                    <ShapeAvatar shape={student.shapeId} color={color} size={80} />
                </div>
                <div className={styles.info}>
                    <h2 className={styles.name}>{student.name}</h2>
                    <p className={styles.detail}>{student.rollNo} • Section {student.section}</p>
                </div>
            </div>
            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <span className={styles.statLabel}>Shape ID</span>
                    <span className={styles.statValue}>{student.shapeId}</span>
                </div>
            </div>
        </Card>
    );
}
