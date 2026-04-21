'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function DeleteStudentButton({ studentId }: { studentId: string }) {
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (!window.confirm('Are you absolutely sure you want to permanently delete this student? This action cannot be undone and will remove all their attendance records and login access.')) {
            return;
        }

        setIsDeleting(true);
        try {
            const response = await fetch(`/api/students/${studentId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                alert('Student successfully deleted.');
                router.push('/faculty/students');
                router.refresh();
            } else {
                const data = await response.json();
                alert(`Error deleting student: ${data.error || 'Unknown error'}`);
                setIsDeleting(false);
            }
        } catch (error) {
            console.error('Failed to delete student', error);
            alert('Failed to delete student due to a network error.');
            setIsDeleting(false);
        }
    };

    return (
        <div style={{ marginTop: '2rem', padding: '1.5rem', border: '1px solid var(--danger-border, #fca5a5)', borderRadius: '0.75rem', backgroundColor: 'var(--danger-bg, #fef2f2)' }}>
            <h3 style={{ fontWeight: 'bold', color: 'var(--danger-text, #991b1b)', marginBottom: '0.5rem' }}>Danger Zone</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                Permanently remove this student from the system. This will delete their profile, login credentials, attendance history, and facial recognition data.
            </p>
            <Button 
                variant="outline" 
                onClick={handleDelete} 
                disabled={isDeleting}
                style={{ borderColor: 'var(--danger-text, #991b1b)', color: 'var(--danger-text, #991b1b)' }}
            >
                <Trash2 size={16} style={{ marginRight: '0.5rem' }} />
                {isDeleting ? 'Deleting...' : 'Delete Student'}
            </Button>
        </div>
    );
}
