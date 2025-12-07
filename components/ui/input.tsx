import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "w-full px-4 py-3 text-base text-text-primary bg-white border border-border-medium rounded-lg transition-all duration-150",
        "placeholder:text-text-muted",
        "focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent",
        "hover:border-border-dark",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-secondary-100",
        "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-text-primary",
        className
      )}
      {...props}
    />
  );
}

export { Input };
