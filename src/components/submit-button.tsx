'use client'

import { forwardRef } from 'react'
import { Loader } from 'lucide-react'
import { useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'
import { Button, type ButtonProps } from '@/components/ui/button'

export interface SubmitButtonProps extends ButtonProps {
  loading?: boolean
}
const SubmitButton = forwardRef<HTMLButtonElement, SubmitButtonProps>(
  ({ className, children, ...props }, ref) => {
    const { pending } = useFormStatus()
    return (
      <Button ref={ref} {...props} disabled={pending} className={className}>
        <span className={cn(pending ? 'hidden' : '')}>{children}</span>
        {pending && (
          <div className="ml-1 flex items-center justify-center ">
            <Loader className="h-5 w-5 animate-spin" />
          </div>
        )}
      </Button>
    )
  },
)
SubmitButton.displayName = 'SubmitButton'

export { SubmitButton }
