'use client';

import { useState, useEffect } from 'react';
import { Check, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const CV_BACKEND_URL = process.env.NEXT_PUBLIC_CV_BACKEND_URL || 'http://localhost:8000';

export default function ProfilePhotoUpload({ studentId }: { studentId: string }) {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [isRegistered, setIsRegistered] = useState<boolean | null>(null);

    useEffect(() => {
        const checkRegistration = async () => {
            try {
                const res = await fetch(`${CV_BACKEND_URL}/check-registration/${studentId}`);
                if (res.ok) {
                    const data = await res.json();
                    setIsRegistered(data.registered);
                } else {
                    setIsRegistered(false);
                }
            } catch (e) {
                console.error("Failed to check registration status", e);
                setIsRegistered(false);
            }
        };
        checkRegistration();
    }, [studentId]);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('student_id', studentId);

        try {
            const res = await fetch(`${CV_BACKEND_URL}/register`, {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
                setIsRegistered(true);
                setMessage('Face registered successfully!');
            } else {
                setMessage('Registration failed. Please try a clearer photo.');
            }
        } catch (error) {
            console.error('Upload failed', error);
            setMessage('Error uploading photo.');
        } finally {
            setUploading(false);
        }
    };

    if (isRegistered === true) {
        return (
            <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--muted)', borderRadius: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', border: '1px solid var(--card-border)' }}>
                <div style={{ backgroundColor: 'var(--success-bg, #dcfce7)', color: 'var(--success-text, #166534)', padding: '0.75rem', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Check size={32} />
                </div>
                <h3 style={{ fontWeight: 'bold', fontSize: '1.125rem', color: 'var(--text-primary)', margin: 0 }}>Face ID Registered</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', textAlign: 'center', margin: 0, marginBottom: '1rem' }}>
                    Your face data is safely stored and ready for automatic attendance.
                </p>
                <div style={{ position: 'relative' }}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleUpload}
                        disabled={uploading}
                        style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                    />
                    <Button variant="outline" disabled={uploading}>
                        <Upload size={16} style={{ marginRight: '0.5rem' }} />
                        {uploading ? 'Updating...' : 'Update Face ID'}
                    </Button>
                </div>
                {message && <p style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: message.includes('success') ? 'var(--success-text, #166534)' : 'var(--danger-text, #991b1b)' }}>{message}</p>}
            </div>
        );
    }

    return (
        <div style={{ marginTop: '1.5rem', padding: '1.5rem', backgroundColor: 'var(--card-bg)', border: '1px solid var(--card-border)', borderRadius: '0.75rem' }}>
            <h3 style={{ fontWeight: 'bold', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Register Face ID</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Upload a clear selfie to enable automatic attendance.</p>
            <div style={{ position: 'relative' }}>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleUpload}
                    disabled={uploading || isRegistered === null}
                    style={{ position: 'absolute', opacity: 0, width: '100%', height: '100%', cursor: 'pointer', left: 0, top: 0 }}
                />
                <Button disabled={uploading || isRegistered === null}>
                    <Upload size={16} style={{ marginRight: '0.5rem' }} />
                    {uploading ? 'Uploading...' : 'Choose Photo'}
                </Button>
            </div>
            {message && <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: message.includes('success') ? 'var(--success-text, #166534)' : 'var(--danger-text, #991b1b)' }}>{message}</p>}
        </div>
    );
}
