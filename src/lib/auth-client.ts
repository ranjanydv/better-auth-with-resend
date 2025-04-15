import { createAuthClient } from "better-auth/react"
import { environmentConfig } from "@/config";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
	baseURL: environmentConfig.baseUrl,
	plugins: [
		adminClient()
	]
})

export const { signIn, signUp, useSession, signOut } = authClient;