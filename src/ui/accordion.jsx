import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion";
import { cn } from "cn";
import { ChevronDownIcon } from "lucide-react";

function Accordion({ className, ...props }) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("flex flex-col space-y-3 w-full", className)}
      {...props}
    />
  );
}

function AccordionItem({ className, ...props }) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn(
        "group overflow-hidden rounded-2xl border border-white/10 bg-card/20 backdrop-blur-xl transition-all duration-500",

        "data-open:border-primary/50 data-open:bg-card/40 data-open:shadow-[0_0_20px_rgba(var(--primary-rgb),0.15)]",
        className,
      )}
      {...props}
    />
  );
}

function AccordionTrigger({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Header className="flex w-full">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex w-full items-center justify-between px-5 py-4 text-sm font-PeydaBold text-main outline-none transition-all",
          "hover:text-primary focus-visible:ring-2 focus-visible:ring-primary/50",
          className,
        )}
        {...props}
      >
        {children}

        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/5 text-muted transition-all duration-300 group-data-open:rotate-180 group-data-open:bg-primary/20 group-data-open:text-primary group-data-open:shadow-[0_0_10px_rgba(var(--primary-rgb),0.3)]">
          <ChevronDownIcon className="h-4 w-4" />
        </div>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
}

function AccordionContent({ className, children, ...props }) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className="overflow-hidden text-sm transition-all data-closed:animate-accordion-up data-open:animate-accordion-down"
      {...props}
    >
      <div className={cn("px-5 pb-5 pt-1", className)}>{children}</div>
    </AccordionPrimitive.Panel>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
