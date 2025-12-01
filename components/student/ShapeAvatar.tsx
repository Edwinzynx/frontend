import React from 'react';

interface ShapeAvatarProps {
    shape: string;
    color: string;
    size?: number;
}

export default function ShapeAvatar({ shape, color, size = 64 }: ShapeAvatarProps) {
    const style = { fill: color };

    const renderShape = () => {
        switch (shape) {
            case 'Circle':
                return <circle cx="50" cy="50" r="45" style={style} />;
            case 'Square':
                return <rect x="10" y="10" width="80" height="80" rx="4" style={style} />;
            case 'Triangle':
                return <polygon points="50,5 95,90 5,90" style={style} />;
            case 'Pentagon':
                return <polygon points="50,5 95,38 79,90 21,90 5,38" style={style} />;
            case 'Hexagon':
                return <polygon points="50,5 90,25 90,75 50,95 10,75 10,25" style={style} />;
            default:
                return <circle cx="50" cy="50" r="45" style={style} />;
        }
    };

    return (
        <svg width={size} height={size} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            {renderShape()}
        </svg>
    );
}
