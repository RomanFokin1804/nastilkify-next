import { NextApiRequest, NextApiResponse } from 'next';
import cookieParser from 'cookie-parser';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    cookieParser()(req, res, () => {
        // Тут ви повинні перевірити сесію або JWT токен для автентифікації користувача
        const token = req.cookies.access_token;
        if (!token) {
            return res.status(401).json({ error: 'Not authenticated' });
        }

        // Розшифруйте токен і отримайте інформацію про користувача
        // const user = jwt.verify(token, process.env.JWT_SECRET);
        // res.status(200).json(user);

        // Для прикладу, якщо користувач автентифікований
        res.status(200).json({ user: { name: 'User', email: 'user@example.com' } });
    });
}