'use server'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { generateId, Scrypt } from 'lucia'
import { z } from 'zod'

import { prisma } from '../prisma'
import { lucia } from './index'

// import {} from "arctic"

const signupSchema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(4, 'Provide your password.').max(255),
})
type SignupInput = z.infer<typeof signupSchema>

export async function signInF(_: any, formData: FormData): Promise<any> {
  const data = Object.fromEntries(formData.entries())
  const parsed = signupSchema.safeParse(data)

  if (!parsed.success) {
    const err = parsed.error.flatten()
    return {
      fieldError: {
        email: err.fieldErrors.email,
        password: err.fieldErrors.password,
      },
    }
  }
  const { email, password } = parsed.data
  const existingUser = await prisma.user.findFirst({ where: { email: email } })

  if (!existingUser) {
    return {
      formError: 'Incorrect email or password',
    }
  }

  if (!existingUser || !existingUser?.hashedPassword) {
    return {
      formError: 'Incorrect email or password',
    }
  }

  const isValidPassword = await new Scrypt().verify(existingUser.hashedPassword, password)
  if (!isValidPassword) {
    return {
      formError: 'Incorrect email or password',
    }
  }

  const session = await lucia.createSession(existingUser.id, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return redirect('/')
}

export async function signUp(_: any, formData: FormData): Promise<any> {
  const data = Object.fromEntries(formData.entries())
  const parsed = signupSchema.safeParse(data)

  if (!parsed.success) {
    const err = parsed.error.flatten()
    return {
      fieldError: {
        email: err.fieldErrors.email,
        password: err.fieldErrors.password,
      },
    }
  }
  const { email, password } = parsed.data
  const existingUser = await prisma.user.findFirst({ where: { email: email } })
  console.log(existingUser)
  if (existingUser) {
    console.log('HEaDADA')
    return {
      formError: 'Cannot create account with that email',
    }
  }
  const userId = generateId(21)
  const hashedPassword = await new Scrypt().hash(password)
  await prisma.user.create({
    data: { id: userId, email: email, hashedPassword: hashedPassword },
  })

  const session = await lucia.createSession(userId, {})
  const sessionCookie = lucia.createSessionCookie(session.id)
  console.log('SESSION', session)
  console.log('SESSIONCOOKIE', sessionCookie)
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

  redirect('/')
}
