'use client';

import type { Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';

import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef } from 'react';

import { cn } from '@/lib/utils';

export interface MenuIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface MenuIconProps extends HTMLAttributes<HTMLButtonElement> {
    size?: number;
    isOpen?: boolean;
    onOpenChange?: (isOpen: boolean) => void;
}

const lineVariants: Variants = {
    normal: {
        rotate: 0,
        y: 0,
        opacity: 1,
    },
    animate: (custom: number) => ({
        rotate: custom === 1 ? 45 : custom === 3 ? -45 : 0,
        y: custom === 1 ? 6 : custom === 3 ? -6 : 0,
        opacity: custom === 2 ? 0 : 1,
        transition: {
            type: 'spring',
            stiffness: 260,
            damping: 20,
        },
    }),
};

const MenuIcon = forwardRef<MenuIconHandle, MenuIconProps>(({ className, size = 28, isOpen = false, onOpenChange, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useEffect(() => {
        controls.start(isOpen ? 'animate' : 'normal');
    }, [controls, isOpen]);

    useImperativeHandle(ref, () => {
        isControlledRef.current = true;

        return {
            startAnimation: () => controls.start('animate'),
            stopAnimation: () => controls.start('normal'),
        };
    });

    const handleClick = useCallback(() => {
        if (onOpenChange) {
            onOpenChange(!isOpen);
        }
    }, [isOpen, onOpenChange]);

    return (
        <button
            className={cn(
                `cursor-pointer select-none p-2 hover:bg-background rounded-md transition-colors duration-200 flex items-center justify-center`,
                className,
            )}
            onClick={handleClick}
            {...props}
        >
            <svg
                fill="none"
                height={size}
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width={size}
                xmlns="http://www.w3.org/2000/svg"
            >
                <motion.line animate={controls} custom={1} variants={lineVariants} x1="4" x2="20" y1="6" y2="6" />
                <motion.line animate={controls} custom={2} variants={lineVariants} x1="4" x2="20" y1="12" y2="12" />
                <motion.line animate={controls} custom={3} variants={lineVariants} x1="4" x2="20" y1="18" y2="18" />
            </svg>
        </button>
    );
});

MenuIcon.displayName = 'MenuIcon';

export { MenuIcon };
