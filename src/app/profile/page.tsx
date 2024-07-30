"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const ProfilePage = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = Cookies.get('access_token');
                if (!token) {
                    throw new Error('No access token found');
                }

                const res = await fetch('http://localhost:3000/users/me', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Замініть на ваш токен доступу
                    },
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch user data');
                }
                const data = await res.json();
                console.log("============== DATA", data);

                setUser(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1>Profile</h1>
            {user && (
                <div>
                    <p>Photo: {user.photo}</p>
                    <p>Name: {user.displayName}</p>
                    <p>Email: {user.email}</p>
                    {/* Додайте інші поля профілю тут */}
                </div>
            )}
        </div>
    );
};

export default ProfilePage;