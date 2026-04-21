import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { studentIds, subject, timeSlot } = await req.json();

        if (!Array.isArray(studentIds)) {
            return NextResponse.json({ message: 'Invalid data format' }, { status: 400 });
        }

        const date = new Date();

        // Fetch all registered students to determine who is absent
        const allStudents = await prisma.student.findMany({
            select: { id: true }
        });

        const presentSet = new Set(studentIds);

        const attendanceRecords = allStudents.map((student) => {
            const isPresent = presentSet.has(student.id);
            return {
                studentId: student.id,
                date: date,
                status: isPresent ? 'PRESENT' : 'ABSENT',
                subject: subject || 'General Classroom',
                timeSlot: timeSlot || 'Current Slot',
            };
        });

        if (attendanceRecords.length > 0) {
            await prisma.attendance.createMany({
                data: attendanceRecords
            });
        }

        return NextResponse.json({ success: true, count: attendanceRecords.length });
    } catch (error) {
        console.error('Error saving batch attendance:', error);
        return NextResponse.json({ error: 'Failed to save attendance' }, { status: 500 });
    }
}
