"use client"

import { SessionProvider } from "next-auth/react"
const ProviderAuth = ({children}) => {
    return <SessionProvider>{children}</SessionProvider>
}

export default ProviderAuth;