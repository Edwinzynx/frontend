import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
// import { AttendanceRecord } from '@/lib/types'; // Remove strict type
import styles from './AttendanceStats.module.css';

interface AttendanceStatsProps {
    records: { status: string }[]; // Minimal interface matching Prisma
    totalSessions: number;
}

export default function AttendanceStats({ records, totalSessions }: AttendanceStatsProps) {
    const presentCount = records.filter(r => r.status.toUpperCase() === 'PRESENT').length;
    const absentCount = records.filter(r => r.status.toUpperCase() === 'ABSENT').length;
    const percentage = totalSessions > 0 ? (presentCount / totalSessions) * 100 : 0;

    const isLowAttendance = percentage < 75;

    return (
        <div className={styles.container}>
            <Card className={styles.mainStat}>
                <div className={styles.percentageWrapper}>
                    <span className={styles.percentage}>{percentage.toFixed(1)}%</span>
                    <span className={styles.label}>Overall Attendance</span>
                    {isLowAttendance && (
                        <Badge variant="danger" className={styles.alertBadge}>Low Attendance</Badge>
                    )}
                </div>
            </Card>

            <div className={styles.grid}>
                <Card title="Present">
                    <span className={styles.count}>{presentCount}</span>
                </Card>
                <Card title="Absent">
                    <span className={styles.count}>{absentCount}</span>
                </Card>
            </div>
        </div>
    );
}
