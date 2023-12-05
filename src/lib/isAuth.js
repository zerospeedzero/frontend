import { useSession, signIn, signOut } from "next-auth/react"
export function isAuth ()  {
  const { data: session } = useSession()
  if (session) {
    console.log(session)
    return true
  }
  return false
}