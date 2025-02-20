'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export function Notification() {
    const pathname = usePathname();
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const message = searchParams.get('message');
    const status = searchParams.get('status');

    useEffect(() => {
        if (message && status) {
            const decodedMessage = decodeURIComponent(message).toString()
                .replace('Ã±', 'ñ')
                .replace('Ã¡', 'á')
                .replace('Ã©', 'é')
                .replace('Ã­', 'í')
                .replace('Ã³', 'ó')
                .replace('Ãº', 'ú');
            if (status !== '200') {
                toast.error(decodedMessage);
            } else {
                toast.success(decodedMessage);
            }
            replace(pathname);
        }
    }, [message, status]);

    return (
        <main>
            <ToastContainer />
        </main>
    );
}