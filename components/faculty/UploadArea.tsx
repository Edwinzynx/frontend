"use client";

import React, { useState, useRef } from 'react';
import { Upload, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import styles from './UploadArea.module.css';

export default function UploadArea() {
    const [isDragging, setIsDragging] = useState(false);
    const [files, setFiles] = useState<File[]>([]);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [result, setResult] = useState<string[] | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [subject, setSubject] = useState('');
    const [timeSlot, setTimeSlot] = useState('');

    const CV_BACKEND_URL = process.env.NEXT_PUBLIC_CV_BACKEND_URL || 'http://localhost:8000';

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            setFiles(Array.from(e.dataTransfer.files));
            setUploadStatus('idle');
            setResult(null);
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(Array.from(e.target.files));
            setUploadStatus('idle');
            setResult(null);
        }
    };

    const handleUpload = async () => {
        if (files.length === 0) return;
        if (!subject || !timeSlot) {
            alert('Please select a Subject and Time Slot before processing attendance.');
            return;
        }

        setIsUploading(true);
        setUploadStatus('idle');
        setResult(null);

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await fetch(`${CV_BACKEND_URL}/mark-attendance`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const data = await response.json();

                // Fetch names for the returned IDs
                let finalNames = data.present_students;
                if (data.present_students.length > 0) {
                    try {
                        const nameRes = await fetch('/api/students/names', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ ids: data.present_students })
                        });
                        if (nameRes.ok) {
                            const nameData = await nameRes.json();
                            finalNames = data.present_students.map((id: string) => nameData.namesMap[id] || id);
                        }

                        // Save attendance to DB using the user-provided inputs
                        await fetch('/api/attendance/mark-batch', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                studentIds: data.present_students,
                                subject: subject,
                                timeSlot: timeSlot
                            })
                        });
                    } catch (e) {
                        console.error('Failed to fetch names or save attendance', e);
                    }
                }

                setResult(finalNames);
                setUploadStatus('success');
            } else {
                setUploadStatus('error');
            }
        } catch {
            setUploadStatus('error');
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Subject</label>
                    <input 
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder="e.g. Data Structures"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--card-border)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Time Slot</label>
                    <input 
                        type="text"
                        value={timeSlot}
                        onChange={(e) => setTimeSlot(e.target.value)}
                        placeholder="e.g. 10:00 AM - 11:00 AM"
                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid var(--card-border)', backgroundColor: 'var(--card-bg)', color: 'var(--text-primary)' }}
                    />
                </div>
            </div>

            <div
                className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    className={styles.hiddenInput}
                    accept="image/*"
                    onChange={handleFileSelect}
                />

                <div className={styles.content}>
                    <div className={styles.iconWrapper}>
                        <Upload size={32} />
                    </div>
                    <p className={styles.text}>
                        <span className={styles.highlight}>Click to upload</span> or drag and drop
                    </p>
                    <p className={styles.subtext}>SVG, PNG, JPG or GIF (max. 800x400px)</p>
                </div>
            </div>

            {files.length > 0 && (
                <div className={styles.fileInfo}>
                    <p>Selected {files.length} file{files.length === 1 ? '' : 's'}: <strong>{files.map(f => f.name).join(', ')}</strong></p>
                    <Button
                        onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                        disabled={isUploading || !subject || !timeSlot}
                    >
                        {isUploading ? 'Processing...' : 'Process Attendance'}
                    </Button>
                </div>
            )}

            {uploadStatus === 'success' && result && (
                <div className={`${styles.alert} ${styles.success}`} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                        <Check size={20} />
                        <span style={{ fontWeight: 'bold' }}>Image processed successfully!</span>
                    </div>
                    {result.length === 0 ? (
                        <p style={{ margin: 0, fontSize: '0.875rem' }}>No known students found in the image.</p>
                    ) : (
                        <div>
                            <p style={{ margin: 0, marginBottom: '0.25rem', fontSize: '0.875rem' }}>Marked Present:</p>
                            <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.875rem' }}>
                                {result.map((name, i) => <li key={i}>{name}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {uploadStatus === 'error' && (
                <div className={`${styles.alert} ${styles.error}`}>
                    <AlertCircle size={20} />
                    <span>Failed to process image. Please try again.</span>
                </div>
            )}
        </div>
    );
}
