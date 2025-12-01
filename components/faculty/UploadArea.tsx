"use client";

import React, { useState, useRef } from 'react';
import { Upload, Check, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import styles from './UploadArea.module.css';

export default function UploadArea() {
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const fileInputRef = useRef<HTMLInputElement>(null);

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
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setFile(e.dataTransfer.files[0]);
            setUploadStatus('idle');
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setUploadStatus('idle');
        }
    };

    const handleUpload = async () => {
        if (!file) return;

        setIsUploading(true);
        setUploadStatus('idle');

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/api/cv/process', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setUploadStatus('success');
                // In a real app, we would handle the results here
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
            <div
                className={`${styles.dropZone} ${isDragging ? styles.dragging : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
            >
                <input
                    type="file"
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

            {file && (
                <div className={styles.fileInfo}>
                    <p>Selected file: <strong>{file.name}</strong></p>
                    <Button
                        onClick={(e) => { e.stopPropagation(); handleUpload(); }}
                        isLoading={isUploading}
                        disabled={uploadStatus === 'success'}
                    >
                        {uploadStatus === 'success' ? 'Processed' : 'Process Attendance'}
                    </Button>
                </div>
            )}

            {uploadStatus === 'success' && (
                <div className={`${styles.alert} ${styles.success}`}>
                    <Check size={20} />
                    <span>Image processed successfully! (CV Integration Pending)</span>
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
