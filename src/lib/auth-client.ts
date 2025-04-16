import { createAuthClient } from 'better-auth/react';
import { adminClient } from 'better-auth/client/plugins';

import { environmentConfig } from '@/config';

export const authClient = createAuthClient({
    baseURL: environmentConfig.baseUrl,
    plugins: [adminClient()],
});

export const { signIn, signUp, useSession, signOut } = authClient;
