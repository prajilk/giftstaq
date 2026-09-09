import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";

import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, ArrowUp01Icon } from "@hugeicons/core-free-icons";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./button";

function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex w-full flex-col", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("bg-secondary my-1 rounded-md", className)}
      {...props}
    />
  );
}

function AccordionTrigger({
  className,
  children,
  iconStyles,
  ...props
}: AccordionPrimitive.Trigger.Props & { iconStyles?: string }) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-center justify-between gap-6 border border-transparent p-4 text-left font-semibold transition-all outline-none hover:underline aria-disabled:pointer-events-none aria-disabled:opacity-50 **:data-[slot=accordion-trigger-icon]:ml-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground",
          className,
        )}
        {...props}
      >
        {children}
        <div
          className={cn(
            "size-7 rounded-full [&>svg]:size-3.75 flex items-center justify-center bg-white text-black shadow hover:bg-white hover:text-black pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden",
            iconStyles,
          )}
        >
          <ChevronDown />
        </div>
        <div
          className={cn(
            "size-7 [&>svg]:size-3.75 rounded-full items-center justify-center bg-white text-black shadow hover:bg-white hover:text-black pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:flex",
            iconStyles,
          )}
        >
          <ChevronUp />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({
  className,
  children,
  panelStyle,
  ...props
}: AccordionPrimitive.Panel.Props & { panelStyle?: string }) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden px-4 text-sm data-open:animate-accordion-down data-closed:animate-accordion-up",
        panelStyle,
      )}
      {...props}
    >
      <div
        className={cn(
          "h-(--accordion-panel-height) pt-0 pb-4 data-ending-style:h-0 data-starting-style:h-0 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
