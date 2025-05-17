
import React from "react";
import { cn } from "@/lib/utils";

interface StepperProps {
  value: number;
  children: React.ReactNode;
  className?: string;
}

interface StepperItemProps {
  className?: string;
}

const Stepper = React.forwardRef<
  HTMLDivElement,
  StepperProps
>(({ value, children, className, ...props }, ref) => {
  const childrenArray = React.Children.toArray(children);
  
  return (
    <div
      ref={ref}
      className={cn("flex items-center justify-between w-full", className)}
      {...props}
    >
      {childrenArray.map((child, index) => {
        return React.cloneElement(child as React.ReactElement, {
          "data-active": value > index + 1 || undefined,
          "data-current": value === index + 1 || undefined,
        });
      })}
    </div>
  );
});
Stepper.displayName = "Stepper";

const StepperItem = React.forwardRef<
  HTMLDivElement,
  StepperItemProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-2 w-full rounded-full bg-muted overflow-hidden transition-colors",
        "[&[data-active]]:bg-banking-blue",
        "[&[data-current]]:bg-banking-lightBlue",
        className
      )}
      {...props}
    />
  );
});
StepperItem.displayName = "StepperItem";

const StepperContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("mt-4", className)}
      {...props}
    />
  );
});
StepperContent.displayName = "StepperContent";

export { Stepper, StepperItem, StepperContent };
