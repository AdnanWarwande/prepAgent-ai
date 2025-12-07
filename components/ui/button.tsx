import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold transition-all duration-150 disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 active:scale-[0.98] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary-600 text-white shadow-sm hover:bg-primary-700 focus:ring-primary-500",
        secondary:
          "bg-white text-secondary-700 border border-secondary-300 shadow-sm hover:bg-secondary-50 focus:ring-primary-500",
        outline:
          "bg-transparent text-primary-600 border-2 border-primary-600 hover:bg-primary-50 focus:ring-primary-500",
        ghost:
          "bg-transparent text-secondary-700 hover:bg-secondary-100 focus:ring-primary-500",
        danger:
          "bg-error text-white shadow-sm hover:bg-red-600 focus:ring-error",
        success:
          "bg-success text-white shadow-sm hover:bg-green-600 focus:ring-success",
        link: 
          "text-primary-600 underline-offset-4 hover:underline focus:ring-0 focus:ring-offset-0",
      },
      size: {
        sm: "h-8 px-4 py-2 text-xs rounded-lg",
        default: "h-10 px-6 py-3 text-sm rounded-lg",
        lg: "h-12 px-8 py-3 text-base rounded-lg",
        icon: "size-10 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
