"use server"

import { auth } from "@/auth"
import { redirect } from "next/navigation"


export const authUser = async (callbackUrl:string) => {
    const session = await auth()
    const user = session?.user

    if (!user) {
        redirect(`/api/auth/signin?callbackUrl=/${callbackUrl}`)
    }

    return user
}