import type { ComponentPropsWithoutRef, ElementType } from "react";
import { Fab, FabProps } from "../Fab";

export const ResponsiveFab = <C extends ElementType = "button">({
  component,
  label,
  icon,
  ...props
}: FabProps<C> & Omit<ComponentPropsWithoutRef<C>, keyof FabProps<C>>) => {
  return (
    <>
      <div className="block md:hidden fixed right-4 bottom-4">
        <Fab component={component as ElementType} icon={icon} {...props} />
      </div>

      <div className="hidden md:block fixed right-8 bottom-8">
        <Fab
          component={component as ElementType}
          icon={icon}
          label={label}
          {...props}
        />
      </div>
    </>
  );
};
