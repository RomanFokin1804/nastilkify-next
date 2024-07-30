"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCallback() {
    const router = useRouter();

    useEffect(() => {
        const fetchAuth = async () => {
            try {
                const res = await fetch('/api/auth/me');
                console.log("====================", res);
                if (res.ok) {
                    const user = await res.json();
                    // Збережіть користувача у стан або у локальне збереження
                    // Наприклад, localStorage.setItem('user', JSON.stringify(user));
                    await router.push('/');
                } else {
                    await router.push('/'); // або інша сторінка у випадку помилки
                }
            } catch (error) {
                console.error('Failed to fetch auth status:', error);
                await router.push('/login'); // або інша сторінка у випадку помилки
            }
        };

        fetchAuth();
    }, [router]);

    return <div>Loading...</div>;
}