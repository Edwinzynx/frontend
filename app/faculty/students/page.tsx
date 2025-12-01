import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import { prisma } from "@/lib/prisma"
import { redirect } from "next/navigation"
import StudentList from '@/components/faculty/StudentList';
import styles from './page.module.css';

export default async function StudentsPage() {
    const session = await getServerSession(authOptions)

    if (!session || !session.user?.email) {
        redirect("/login")
    }

    // Fetch all students with attendance
    const students = await prisma.student.findMany({
        include: {
            attendance: true
        },
        orderBy: {
            name: 'asc'
        }
    });

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Student Directory</h1>
            <StudentList students={students} />
        </div>
    );
}
