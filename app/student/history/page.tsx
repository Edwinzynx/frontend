import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import styles from './page.module.css';

export default async function HistoryPage() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        redirect("/login")
    }

    const student = await prisma.student.findUnique({
        where: { userEmail: session.user.email },
        include: {
            attendance: {
                orderBy: {
                    date: 'desc'
                }
            }
        }
    });

    if (!student) {
        return <div>Student profile not found.</div>;
    }

    const records = student.attendance;

    return (
        <Card title="Attendance History">
            <div className={styles.tableWrapper}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Subject</th>
                            <th>Time Slot</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {records.map((record) => (
                            <tr key={record.id}>
                                <td>{new Date(record.date).toLocaleDateString()}</td>
                                <td>{record.subject || '-'}</td>
                                <td>{record.timeSlot || '-'}</td>
                                <td>
                                    <Badge variant={record.status === 'PRESENT' ? 'success' : 'danger'}>
                                        {record.status}
                                    </Badge>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
