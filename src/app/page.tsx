import Image from 'next/image'

import { validateRequest } from '@/lib/auth'
import { Button } from '@/components/ui/button'

export default async function Home() {
  const { user } = await validateRequest()
  console.log('USERMAIN', user)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="flex flex-col">
        <Button>init</Button>
        <Button>init</Button>
      </div>
    </main>
  )
}
