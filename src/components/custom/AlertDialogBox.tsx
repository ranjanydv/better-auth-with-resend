import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';
import React from 'react';

import { cn } from '@/lib/utils';

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '../ui/alert-dialog';

const iconConfig = {
    info: { icon: Info, bg: 'bg-primary/10', text: 'text-primary' },
    alert: { icon: AlertCircle, bg: 'bg-yellow-800/10', text: 'text-yellow-600' },
    danger: { icon: TriangleAlert, bg: 'bg-red-600/10', text: 'text-red-500' },
    success: { icon: CheckCircle2, bg: 'bg-green-600/10', text: 'text-green-500' },
} as const;

type SizeType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | 'full';

interface IAlertDialogBox {
    isOpen?: boolean;
    size?: SizeType;
    type?: keyof typeof iconConfig | 'form';
    title?: string;
    description?: string;
    cancelText?: string;
    actionText?: string;
    onClose?: () => void; // Made onClose optional
    onAction?: () => void;
    trigger?: React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    showIcon?: boolean;
    showCloseButton?: boolean;
    hideFooter?: boolean;
    position?: 'top' | 'center';
    footerDirection?: 'row' | 'row-reverse';
    iconClassName?: string;
    footerClassName?: string;
    cancelButtonClassName?: string;
    actionButtonClassName?: string;
}

const AlertDialogBox = ({
    isOpen,
    size = 'md',
    type = 'info',
    title,
    description,
    cancelText = 'Cancel',
    actionText = 'Continue',
    onClose, // Still using onClose internally
    onAction,
    trigger,
    children,
    className,
    showIcon = true,
    showCloseButton = false,
    hideFooter = false,
    position = 'top',
    footerDirection = 'row',
    iconClassName,
    footerClassName,
    cancelButtonClassName,
    actionButtonClassName,
}: IAlertDialogBox) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const controlled = isOpen !== undefined;
    const openState = controlled ? isOpen : internalOpen;
    const setOpenState = controlled ? onClose : setInternalOpen;

    const getIcon = () => {
        if (!showIcon || type === 'form') return null;

        const config = iconConfig[type as keyof typeof iconConfig];

        if (!config) return null;

        const Icon = config.icon;

        return (
            <span className={cn(`${config.bg} p-3 rounded-full`, iconClassName)}>
                <Icon className={`w-6 h-6 ${config.text}`} />
            </span>
        );
    };

    // Improved size classes with more precise widths
    const sizeClasses: Record<SizeType, string> = {
        xs: 'w-xs',
        sm: 'w-sm',
        md: 'w-md',
        lg: 'w-lg',
        xl: 'w-xl',
        '2xl': 'w-2xl',
        '3xl': 'w-3xl',
        '4xl': 'w-4xl',
        full: 'w-[95vw]',
    };

    const positionClasses = {
        top: 'top-[20%] translate-y-0 data-[state=open]:slide-in-from-top-[20%] data-[state=closed]:slide-out-to-top-[20%]',
        center: 'top-[50%] -translate-y-1/2 data-[state=open]:slide-in-from-top-[10%] data-[state=closed]:slide-out-to-bottom-[10%]',
    };

    const handleClose = (e: React.MouseEvent) => {
        e.preventDefault();
        setOpenState?.(false);
    };

    return (
        <AlertDialog open={openState} onOpenChange={setOpenState}>
            {trigger && <AlertDialogTrigger asChild onClick={() => setOpenState?.(true)}>{trigger}</AlertDialogTrigger>}
            <AlertDialogContent className={cn('w-full bg-white', sizeClasses[size], positionClasses[position], className)}>
                {(showCloseButton || hideFooter) && (
                    <button
                        aria-label="Close dialog"
                        className="top-4 right-4 absolute hover:bg-accent opacity-70 hover:opacity-100 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-ring ring-offset-background focus:ring-offset-2 transition-opacity disabled:pointer-events-none"
                        onClick={handleClose}
                    >
                        <X className="w-4 h-4" />
                        <span className="sr-only">Close</span>
                    </button>
                )}

                <AlertDialogHeader>
                    <AlertDialogTitle className="sr-only">{title || 'Nexsus'}</AlertDialogTitle>
                    {getIcon() && <div className="flex justify-center items-center gap-2 py-3">{getIcon()}</div>}
                    {description && <AlertDialogDescription className="text-base text-center">{description}</AlertDialogDescription>}
                </AlertDialogHeader>

                {children}

                {!hideFooter && (
                    <AlertDialogFooter
                        className={cn(
                            'flex gap-2 mt-4',
                            footerDirection === 'row-reverse' ? 'flex-row-reverse' : 'flex-row',
                            'sm:flex-row sm:justify-end',
                            footerClassName,
                        )}
                    >
                        <AlertDialogCancel className={cn('mt-0 px-6 rounded-full', cancelButtonClassName)} onClick={handleClose}>{cancelText}</AlertDialogCancel>
                        <AlertDialogAction className={cn('px-6 rounded-full', actionButtonClassName)} onClick={onAction}>
                            {actionText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogBox;