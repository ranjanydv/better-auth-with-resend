import { db } from "@/lib/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";
import { reactVerifyEmailEmail } from "./email/email-verification";
import { resend } from "./email/resend";
import { reactResetPasswordEmail } from "./email/reset-password";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	emailAndPassword: {
		enabled: true,
		// disableSignUp: true,
		minPasswordLength: 8,
		resetPasswordTokenTtl: 3600,
		requireEmailVerification: true,
		async sendResetPassword({ user, url }) {
			await resend.emails.send({
				from: "noreply@info.ranjanyadav.com.np",
				to: user.email,
				subject: "Reset your password",
				react: reactResetPasswordEmail({
					username: user.email,
					resetLink: url,
				}),
			});
		},
	},
	emailVerification: {
		async sendVerificationEmail({ user, url }) {
			await resend.emails.send({
				from: "noreply@info.ranjanyadav.com.np",
				to: user.email,
				subject: "Verify your email address",
				react: reactVerifyEmailEmail({
					username: user.email,
					verificationLink: url,
				}),
			});
		},
	},
	socialProviders: {
		github: {
			clientId: process.env.GITHUB_CLIENT_ID as string,
			clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
		},
	},
	plugins: [
		nextCookies(),
		admin()
	]
});
