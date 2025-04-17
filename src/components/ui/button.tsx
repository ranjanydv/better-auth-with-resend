import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

const buttonVariants = cva(
    "inline-flex justify-center items-center gap-2 disabled:opacity-50 aria-invalid:border-destructive focus-visible:border-ring rounded-sm outline-none aria-invalid:ring-destructive/20 focus-visible:ring-[3px] focus-visible:ring-ring/50 [&_svg:not([class*='size-'])]:size-4 font-medium text-sm whitespace-nowrap transition-all cursor-pointer [&_svg]:pointer-events-none disabled:pointer-events-none shrink-0 [&_svg]:shrink-0",
    {
        variants: {
            variant: {
                default: 'bg-primary text-primary-foreground shadow-xs hover:bg-primary/90',
                destructive: 'bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20',
                outline: 'border-2 border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground ',
                secondary: 'bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80',
                ghost: 'hover:bg-accent hover:text-accent-foreground',
                link: 'text-primary underline-offset-4 hover:underline',
            },
            size: {
                default: 'h-11 px-4 py-2 has-[>svg]:px-6',
                sm: 'h-9 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5',
                lg: 'h-11 rounded-sm px-6 has-[>svg]:px-4',
                icon: 'size-9',
            },
        },
        defaultVariants: {
            variant: 'default',
            size: 'default',
        },
    }
);

function Button({
    className,
    variant,
    size,
    isLoading = false,
    asChild = false,
    children,
    ...props
}: React.ComponentProps<'button'> &
    VariantProps<typeof buttonVariants> & {
        isLoading?: boolean;
        asChild?: boolean;
    }) {
    const Comp = asChild ? Slot : 'button';

    return (
        <Comp disabled={isLoading} className={cn(buttonVariants({ variant, size, className }))} data-slot="button" {...props}>
            {isLoading && <LoaderCircle className='animate-spin' />}
            {children}
        </Comp>
    );
}

export { Button, buttonVariants };
