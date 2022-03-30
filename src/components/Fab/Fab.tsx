import { ElementType, ReactNode } from "react";
import type { ComponentPropsWithoutRef } from "react";
import clsx from "clsx";

export interface FabProps<C extends ElementType> {
  component?: C;
  icon: ElementType;
  label?: ReactNode;
}

export const Fab = <C extends ElementType = "button">({
  component,
  label,
  className,
  icon: Icon,
  ...props
}: FabProps<C> & Omit<ComponentPropsWithoutRef<C>, keyof FabProps<C>>) => {
  const Component = component || "button";
  return (
    <Component
      className={clsx(
        "bg-sky-500 hover:bg-sky-700 text-white rounded-2xl inline-flex justify-center items-center shadow-lg",
        label ? "h-12 px-4 font-sans font-medium text-sm" : "w-14 h-14",
        className
      )}
      {...props}
    >
      <Icon className={clsx("h-6 w-6", label && "mr-2")} />
      {label}
    </Component>
  );
};
