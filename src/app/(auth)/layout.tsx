import "../globals.css"
import {Metadata} from "next";
import {Inter} from "next/font/google";
import {ClerkProvider} from "@clerk/nextjs";

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: "Threads Authentication",
    description: "This is related to all the authentication done in our app"
}
export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <ClerkProvider>
            <html lang="en">
            <body className={inter.className}>{children}</body>
            </html>
        </ClerkProvider>

    )
}