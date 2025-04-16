import React from 'react';

import { db } from '@/lib/db';
async function getUsers() {
    return await db.query.user.findMany({
        columns: {
            id: true,
            name: true,
            email: true,
            emailVerified: true,
            role: true,
        },
    });
}

const page = async () => {
    const users = await getUsers();

    return (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-2">
            {users.map((user) => (
                <pre key={user.id} className="bg-gray-100 p-4 rounded-lg">
                    {JSON.stringify(user, null, 2)}
                </pre>
            ))}
        </div>
    );
};

export default page;
