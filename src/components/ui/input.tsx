import * as React from 'react';

import { cn } from '@/lib/utils';

function Input({
    className,
    type,
    startIcon,
    ...props
}: React.ComponentProps<'input'> & {
    startIcon?: React.ReactNode;
}) {
    return (
        <div className="relative flex items-center w-full">
            {startIcon && <div className="left-3 absolute flex items-center text-gray-500">{startIcon}</div>}
            <input
                className={cn(
                    'h-12 file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground border-2 border-input flex w-full min-w-0 rounded-md bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
                    'focus-visible:border-primary focus-visible:text-primary',
                    'aria-invalid:ring-destructive/20 aria-invalid:border-destructive rounded-sm',
                    startIcon && 'pl-10',
                    className,
                )}
                data-slot="input"
                type={type}
                {...props}
            />
        </div>
    );
}

export { Input };
