import DashboardLayout from '@/components/layout/DashboardLayout';
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/auth"
import { redirect } from "next/navigation"

export default async function FacultyLayout({
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
            role="faculty"
            title="Faculty Dashboard"
            user={{ name: session.user?.name || 'Faculty', role: 'Faculty' }}
        >
            {children}
        </DashboardLayout>
    );
}
