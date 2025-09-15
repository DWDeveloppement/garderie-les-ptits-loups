import { Button as RadixButton } from "@radix-ui/themes"
import * as React from "react"

export type ButtonProps = React.ComponentProps<typeof RadixButton>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    return (
      <RadixButton ref={ref} {...props}>
        {children}
      </RadixButton>
    )
  }
)
Button.displayName = "Button"

export { Button }
