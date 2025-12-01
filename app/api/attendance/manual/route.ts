import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || session.user?.role !== 'FACULTY') {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const { rollNo, date, status, subject, timeSlot } = body;

        if (!rollNo || !date || !status || !subject || !timeSlot) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Find student by roll number
        const student = await prisma.student.findUnique({
            where: { rollNo },
        });

        if (!student) {
            return NextResponse.json({ message: 'Student not found with this Roll No' }, { status: 404 });
        }

        // Create attendance record
        const attendance = await prisma.attendance.create({
            data: {
                date: new Date(date),
                status,
                subject,
                timeSlot,
                studentId: student.id,
            },
        });

        return NextResponse.json({ message: 'Attendance marked successfully', attendance }, { status: 201 });
    } catch (error: any) {
        console.error('Manual attendance error:', error);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
