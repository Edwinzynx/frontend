import { Card } from '@/components/ui/Card';
import styles from './StudentList.module.css';

interface Student {
    id: string;
    name: string;
    rollNo: string;
    section: string;
    course: string;
    semester: string;
    attendance: any[];
}

interface StudentListProps {
    students: Student[];
}

export default function StudentList({ students }: StudentListProps) {
    return (
        <Card title="Registered Students" className={styles.card}>
            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Roll No</th>
                            <th>Course</th>
                            <th>Section</th>
                            <th>Attendance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => {
                            const presentCount = student.attendance.filter((r: any) => r.status === 'PRESENT').length;
                            const total = student.attendance.length;
                            const rate = total > 0 ? (presentCount / total) * 100 : 0;

                            return (
                                <tr key={student.id}>
                                    <td>{student.name}</td>
                                    <td>{student.rollNo}</td>
                                    <td>{student.course} ({student.semester})</td>
                                    <td>{student.section}</td>
                                    <td>{rate.toFixed(0)}%</td>
                                </tr>
                            );
                        })}
                        {students.length === 0 && (
                            <tr>
                                <td colSpan={5} className={styles.empty}>No students registered yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
