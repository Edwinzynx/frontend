'use client';

import { Button } from './Button';
import { useRouter } from 'next/navigation';

export function SignOutButton() {
    const router = useRouter();

    return (
        <Button
            variant="outline"
            size="sm"
            onClick={() => router.push('/')}
        >
            Sign Out
        </Button>
    );
}
