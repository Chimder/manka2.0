'use client'

import Link from 'next/link'
import { useFormState } from 'react-dom'

// import { APP_TITLE } from '@/lib/constants'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
// import { DiscordLogoIcon } from '@/components/icons'
import { PasswordInput } from '@/components/password-input'
import { signUp } from '@/lib/auth/actions'
import { SubmitButton } from '@/components/submit-button'

export function Signup() {
  const [state, formAction] = useFormState(signUp, null)
  console.log('Steate', state)
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle> Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              required
              placeholder="email@example.com"
              autoComplete="email"
              name="email"
              type="email"
            />
          </div>
          <div className="space-y-2">
            <Label>Password</Label>
            <PasswordInput
              name="password"
              required
              autoComplete="current-password"
              placeholder="********"
            />
          </div>

          {state?.fieldError && (
            <ul className="list-disc space-y-1 rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
              {Object.values(state.fieldError).map((err, i) => (
                <li className="ml-4" key={i}>
                  {err as string}
                </li>
              ))}
            </ul>
          )}

          {state?.formError && (
            <p className="rounded-lg border bg-destructive/10 p-2 text-[0.8rem] font-medium text-destructive">
              {state?.formError}
            </p>
          )}

          <div>
            <Link href={'/login'}>
              <span className="p-0 text-xs font-medium underline-offset-4 hover:underline">
                Already signed up? Login instead.
              </span>
            </Link>
          </div>

          <SubmitButton className="w-full">singUp</SubmitButton>
          <Button variant="outline" className="w-full" asChild>
            <Link href="/">Cancel</Link>
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
