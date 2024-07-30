"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Перевіряємо, чи користувач залогінений, перевіряючи локальне збереження або запит на сервер
        const fetchUser = async () => {
            const res = await fetch('/api/auth/me');
            if (res.ok) {
                const data = await res.json();
                setUser(data);
            }
        };
        fetchUser();
    }, []);

    const handleLogin = () => {
        window.location.href = 'http://localhost:3000/auth/google';
    };

    const handleLogout = () => {
        // Видалити токен або зробити запит на logout на сервері
        setUser(null);
        // Додайте додаткову логіку для видалення токенів або сесії
    };

    return (
        <main className={styles.main}>
            <div className={styles.description}>
                <p>
                    Get started by editing&nbsp;
                    <code className={styles.code}>src/app/page.tsx</code>
                </p>
            </div>

            <div className={styles.center}>
                <Image
                    className={styles.logo}
                    src="/next.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
            </div>

            <div className={styles.links}>
                {!user ? (
                    <button onClick={handleLogin}>Login with Google</button>
                ) : (
                    <>
                        <a href="/profile">Profile</a>
                        <a href="/schedule">Schedule</a>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                )}
            </div>
        </main>
    );
}
