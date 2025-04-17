'use client';

import type React from 'react';
import type { Transition, Variants } from 'motion/react';
import type { HTMLAttributes } from 'react';

import { motion, useAnimation } from 'motion/react';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

import { cn } from '@/lib/utils';

export interface PanelLeftCloseIconHandle {
    startAnimation: () => void;
    stopAnimation: () => void;
}

interface PanelLeftCloseIconProps extends HTMLAttributes<HTMLDivElement> {
    size?: number;
}

const defaultTransition: Transition = {
    times: [0, 0.4, 1],
    duration: 0.5,
};

const pathVariants: Variants = {
    normal: { x: 0 },
    animate: { x: [0, -1.5, 0] },
};

const PanelLeftCloseIcon = forwardRef<PanelLeftCloseIconHandle, PanelLeftCloseIconProps>(
    ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
        const controls = useAnimation();
        const isControlledRef = useRef(false);

        useImperativeHandle(ref, () => {
            isControlledRef.current = true;

            return {
                startAnimation: () => controls.start('animate'),
                stopAnimation: () => controls.start('normal'),
            };
        });

        const handleMouseEnter = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (!isControlledRef.current) {
                    controls.start('animate');
                } else {
                    onMouseEnter?.(e);
                }
            },
            [controls, onMouseEnter],
        );

        const handleMouseLeave = useCallback(
            (e: React.MouseEvent<HTMLDivElement>) => {
                if (!isControlledRef.current) {
                    controls.start('normal');
                } else {
                    onMouseLeave?.(e);
                }
            },
            [controls, onMouseLeave],
        );

        return (
            <div
                className={cn(
                    `cursor-pointer select-none p-2 hover:bg-accent rounded-md transition-colors duration-200 flex items-center justify-center`,
                    className,
                )}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
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
                    <rect height="18" rx="2" width="18" x="3" y="3" />
                    <path d="M9 3v18" />
                    <motion.path animate={controls} d="m16 15-3-3 3-3" transition={defaultTransition} variants={pathVariants} />
                </svg>
            </div>
        );
    },
);

PanelLeftCloseIcon.displayName = 'PanelLeftCloseIcon';

export { PanelLeftCloseIcon };
