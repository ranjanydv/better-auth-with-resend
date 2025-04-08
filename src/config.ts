type EnvironmentConfig = {
    baseUrl: string;
    apiUrl: string;
    index: boolean;
    follow: boolean;
};

const config: { [key: string]: EnvironmentConfig } = {
    production: {
        baseUrl: process.env.BETTER_AUTH_URL || 'https://nexsuseducation.com',
        apiUrl: process.env.NEXT_API_URL || 'https://api.nexsuseducation.com',
        index: true,
        follow: true,
    },
    development: {
        baseUrl: process.env.BETTER_AUTH_URL || 'http://localhost:3000',
        apiUrl: process.env.NEXT_API_URL || 'http://localhost:1337',
        index: false,
        follow: false,
    },
};

const environment = process.env.NEXT_PUBLIC_ENVIRONMENT || 'development';

export const environmentConfig = config[environment];
