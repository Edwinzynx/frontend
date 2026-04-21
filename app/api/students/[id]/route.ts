import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/auth";

const CV_BACKEND_URL = process.env.NEXT_PUBLIC_CV_BACKEND_URL || 'http://localhost:8000';

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const session = await getServerSession(authOptions);
        
        // Basic authorization check (ensure only faculty can delete)
        if (!session || session.user?.role !== 'FACULTY') {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
        }

        const studentId = id;

        // 1. Fetch the student to get their userEmail before deletion
        const student = await prisma.student.findUnique({
            where: { id: studentId }
        });

        if (!student) {
            return NextResponse.json({ error: 'Student not found' }, { status: 404 });
        }

        // 2. Call CV Backend to delete the face embedding
        try {
            await fetch(`${CV_BACKEND_URL}/remove-student/${studentId}`, {
                method: 'DELETE',
            });
        } catch (cvError) {
            console.error('Failed to delete from CV backend, but proceeding with DB deletion:', cvError);
            // We proceed even if CV backend fails, to prevent orphaned DB records
        }

        // 3. Delete records from Postgres using a transaction
        await prisma.$transaction(async (tx) => {
            // Delete Attendance records
            await tx.attendance.deleteMany({
                where: { studentId: studentId }
            });

            // Delete Student profile
            await tx.student.delete({
                where: { id: studentId }
            });

            // Delete User credentials
            await tx.user.delete({
                where: { email: student.userEmail }
            });
        });

        return NextResponse.json({ success: true, message: 'Student permanently deleted' });
    } catch (error) {
        console.error('Error deleting student:', error);
        return NextResponse.json({ error: 'Failed to delete student' }, { status: 500 });
    }
}
