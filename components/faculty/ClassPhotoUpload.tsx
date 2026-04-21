'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';

export default function ClassPhotoUpload() {
    const [uploading, setUploading] = useState(false);
    const [result, setResult] = useState<string[] | null>(null);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) return;

        setUploading(true);
        const formData = new FormData();
        Array.from(e.target.files).forEach((file) => {
            formData.append('files', file);
        });

        try {
            const res = await fetch('http://localhost:8000/mark-attendance', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            setResult(data.present_students);
            if (data.present_students && data.present_students.length > 0) {
                // Optional: Trigger a refresh of the page data if needed
                // window.location.reload(); 
            }
        } catch (error) {
            console.error('Upload failed', error);
            alert('Failed to process image');
        } finally {
            setUploading(false);
        }
    };

    return (
        <Card title="Mark Attendance via Photo">
            <div style={{ padding: '1rem' }}>
                <p style={{ marginBottom: '1rem', color: '#666' }}>Upload a classroom photo to automatically mark attendance.</p>
                <input
                    type="file"
                    accept="image/*"
                    multiple={true}
                    onChange={handleUpload}
                    disabled={uploading}
                    style={{ marginBottom: '1rem' }}
                />
                {uploading && <p>Processing image...</p>}
                {result && (
                    <div>
                        <h4 style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Marked Present:</h4>
                        {result.length === 0 ? (
                            <p>No known students found.</p>
                        ) : (
                            <ul style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
                                {result.map((name, i) => <li key={i}>{name}</li>)}
                            </ul>
                        )}
                    </div>
                )}
            </div>
        </Card>
    );
}
