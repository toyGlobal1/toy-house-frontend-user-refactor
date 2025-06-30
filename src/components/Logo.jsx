import { cn } from "@heroui/react";

export function Logo({ className, ...props }) {
  return (
    <img
      src="/toy-house-logo-bg-transparent.webp"
      alt="Toy house logo"
      className={cn("size-20", className)}
      {...props}
    />
  );
}
