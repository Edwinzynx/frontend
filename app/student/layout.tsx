import DashboardLayout from '@/components/layout/DashboardLayout';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"

export default async function StudentLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/login")
    }

    return (
        <DashboardLayout
            role="student"
            title="Student Dashboard"
            user={{ name: session.user?.name || 'Student', role: 'Student' }}
        >
            {children}
        </DashboardLayout>
    );
}
