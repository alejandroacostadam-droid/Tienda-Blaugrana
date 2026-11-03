import type * as React from 'react'

import { cn } from '@/lib/utils'

export function Container({ className, ...props }: React.ComponentProps<'div'>) {
  return <div className={cn('shell', className)} {...props} />
}
