'use server';

import { auth } from '@/lib/auth';

export const signup = async (formData: FormData) => {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const name = formData.get('name') as string;

    await auth.api.signUpEmail({
        body: {
            name,
            email,
            password,
        },
        asResponse: true,
    });

    // Don't return the response
};
// export const signup = async (formData: FormData) => {
//     const email = formData.get('email') as string;
//     const password = formData.get('password') as string;
//     const name = formData.get('name') as string;
//     const image = formData.get('image') as string || '';

//     const { data, error } = await signUp.email({
//         email, // user email address
//         password, // user password -> min 8 characters by default
//         name, // user display name
//         image, // user image url (optional)
//         callbackURL: "/dashboard" // a url to redirect to after the user verifies their email (optional)
//     }, {
//         onRequest: (ctx) => {
//             //show loading
//             console.log("Loading...");
//         },
//         onSuccess: (ctx) => {
//             //redirect to the dashboard or sign in page
//             console.log("Success");
//         },
//         onError: (ctx) => {
//             // display the error message
//             console.log(ctx.error.message);
//         },
//     });
// };
