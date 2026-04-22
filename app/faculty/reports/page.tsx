import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import ReportsCharts from './ReportsCharts';

export default async function ReportsPage() {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
        redirect("/login");
    }

    // 1. Calculate Weekly Data
    const today = new Date();
    const currentDay = today.getDay(); // 0 is Sunday, 1 is Monday
    // Calculate start of week (Monday)
    const diffToMonday = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); 
    const startOfWeek = new Date(today);
    startOfWeek.setDate(diffToMonday);
    startOfWeek.setHours(0, 0, 0, 0);

    const attendanceRecords = await prisma.attendance.findMany({
        where: {
            date: { gte: startOfWeek }
        }
    });

    const weeklyDataTemplate = [
        { name: 'Mon', present: 0, absent: 0 },
        { name: 'Tue', present: 0, absent: 0 },
        { name: 'Wed', present: 0, absent: 0 },
        { name: 'Thu', present: 0, absent: 0 },
        { name: 'Fri', present: 0, absent: 0 },
    ];

    attendanceRecords.forEach(record => {
        const recordDay = record.date.getDay();
        // 1 = Mon, 5 = Fri
        if (recordDay >= 1 && recordDay <= 5) {
            const index = recordDay - 1;
            if (record.status === 'PRESENT' || record.status === 'LATE') {
                weeklyDataTemplate[index].present += 1;
            } else if (record.status === 'ABSENT') {
                weeklyDataTemplate[index].absent += 1;
            }
        }
    });

    // 2. Calculate Class Performance Data
    const allRecords = await prisma.attendance.findMany();
    
    // Group by studentId
    const studentStats: Record<string, { total: number, present: number }> = {};
    allRecords.forEach(record => {
        if (!studentStats[record.studentId]) {
            studentStats[record.studentId] = { total: 0, present: 0 };
        }
        studentStats[record.studentId].total += 1;
        if (record.status === 'PRESENT' || record.status === 'LATE') {
            studentStats[record.studentId].present += 1;
        }
    });

    let range90 = 0, range80 = 0, range70 = 0, range60 = 0, rangeBelow60 = 0;

    Object.values(studentStats).forEach(stat => {
        if (stat.total === 0) return;
        const percent = (stat.present / stat.total) * 100;
        if (percent >= 90) range90++;
        else if (percent >= 80) range80++;
        else if (percent >= 70) range70++;
        else if (percent >= 60) range60++;
        else rangeBelow60++;
    });

    const classPerformanceData = [
        { range: '90-100%', count: range90 },
        { range: '80-89%', count: range80 },
        { range: '70-79%', count: range70 },
        { range: '60-69%', count: range60 },
        { range: '<60%', count: rangeBelow60 },
    ];

    return <ReportsCharts weeklyData={weeklyDataTemplate} classPerformanceData={classPerformanceData} />;
}
