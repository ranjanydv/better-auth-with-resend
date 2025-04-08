import { createAuthClient } from "better-auth/react"
import { environmentConfig } from "@/config";

export const authClient = createAuthClient({
	baseURL: environmentConfig.baseUrl
})

export const { signIn, signUp, useSession, signOut } = authClient;