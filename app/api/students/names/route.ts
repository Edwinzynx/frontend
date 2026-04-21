import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { ids } = await req.json();

        if (!Array.isArray(ids)) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }

        const students = await prisma.student.findMany({
            where: {
                id: {
                    in: ids
                }
            },
            select: {
                id: true,
                name: true
            }
        });

        const namesMap = students.reduce((acc, curr) => {
            acc[curr.id] = curr.name;
            return acc;
        }, {} as Record<string, string>);

        return NextResponse.json({ namesMap });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch names' }, { status: 500 });
    }
}
