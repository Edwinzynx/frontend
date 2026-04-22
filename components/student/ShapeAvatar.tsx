import React from 'react';

interface ShapeAvatarProps {
    shape?: 'circle' | 'square' | 'triangle' | 'diamond' | string;
    color?: string;
    size?: number;
}

export default function ShapeAvatar({ shape = 'circle', color = '#3b82f6', size = 40 }: ShapeAvatarProps) {
    const style: React.CSSProperties = {
        width: size,
        height: size,
        backgroundColor: color,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: size * 0.4,
    };

    if (shape === 'circle') {
        style.borderRadius = '50%';
    } else if (shape === 'diamond') {
        style.transform = 'rotate(45deg)';
        // To keep content straight if needed, we'd need a wrapper
    } else if (shape === 'square') {
        style.borderRadius = '0.5rem';
    }

    return (
        <div style={style}>
            {/* Optional: Initials or Icon */}
        </div>
    );
}
