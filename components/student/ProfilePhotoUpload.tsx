'use client';

import { useState } from 'react';

export default function ProfilePhotoUpload({ studentId }: { studentId: string }) {
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files?.[0]) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', e.target.files[0]);
        formData.append('student_id', studentId);

        try {
            const res = await fetch('http://localhost:8000/register', {
                method: 'POST',
                body: formData,
            });
            if (res.ok) {
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

    return (
        <div style={{ marginTop: '1.5rem', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
            <h3 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Register Face ID</h3>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Upload a clear selfie to enable automatic attendance.</p>
            <input
                type="file"
                accept="image/*"
                onChange={handleUpload}
                disabled={uploading}
            />
            {uploading && <p style={{ marginTop: '0.5rem' }}>Uploading...</p>}
            {message && <p style={{ marginTop: '0.5rem', color: message.includes('success') ? 'green' : 'red' }}>{message}</p>}
        </div>
    );
}
