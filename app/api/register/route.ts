import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, password, role, name, rollNo, section, course, semester, shapeId, phoneNo } = body;

        if (!email || !password || !role) {
            return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            return NextResponse.json({ message: 'User already exists' }, { status: 409 });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name: name || '',
                role: role.toUpperCase(), // Ensure role matches enum (STUDENT, FACULTY)
                studentProfile: role === 'student' ? {
                    create: {
                        name: name || '',
                        rollNo: rollNo || '',
                        section: section || '',
                        course: course || '',
                        semester: semester || '',
                        shapeId: shapeId || 'Circle', // Default shape
                        phoneNo: phoneNo || '',
                    }
                } : undefined
            },
        });

        return NextResponse.json({ message: 'User created successfully', user: { email: user.email, role: user.role } }, { status: 201 });
    } catch (error: any) {
        console.error('Registration error:', error);
        return NextResponse.json({ message: 'Internal server error', error: error.message }, { status: 500 });
    }
}
