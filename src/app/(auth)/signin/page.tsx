import { redirect } from 'next/navigation'

import { validateRequest } from '@/lib/auth'

import { SignIn } from './signin'

export const metadata = {
  title: 'Login',
  description: 'Login Page',
}

export default async function SignInPage() {
  const { user, session } = await validateRequest()
  console.log('User', user)
  console.log('Session', session)

  // if (user) redirect('/')

  return <SignIn />
}
