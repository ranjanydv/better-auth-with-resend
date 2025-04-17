import { cn } from '@/lib/utils';
import { AlertCircle, CheckCircle2, Info, TriangleAlert, X } from 'lucide-react';
import React from 'react';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger
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
    onClose: () => void;
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
}

const AlertDialogBox = ({
    isOpen,
    size = 'md',
    type = 'info',
    title,
    description,
    cancelText = 'Cancel',
    actionText = 'Continue',
    onClose,
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
}: IAlertDialogBox) => {
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

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            {trigger && <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>}
            <AlertDialogContent className={cn('w-full bg-white', sizeClasses[size], positionClasses[position], className)}>
                {(showCloseButton || hideFooter) && (
                    <button
                        onClick={onClose}
                        className="top-4 right-4 absolute hover:bg-accent opacity-70 hover:opacity-100 p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-ring ring-offset-background focus:ring-offset-2 transition-opacity disabled:pointer-events-none"
                        aria-label="Close dialog">
                        <X className="w-4 h-4" />
                        <span className="sr-only">Close</span>
                    </button>
                )}

                <AlertDialogHeader className={cn(showCloseButton && 'pr-8')}>
                    <AlertDialogTitle className="sr-only">{title || 'Nexsus'}</AlertDialogTitle>
                    {getIcon() && <div className="flex justify-center items-center gap-2 py-3 pl-8">{getIcon()}</div>}
                    {description && <AlertDialogDescription className="text-base text-center">{description}</AlertDialogDescription>}
                </AlertDialogHeader>

                {children}

                {!hideFooter && (
                    <AlertDialogFooter
                        className={cn(
                            'flex gap-2 mt-4',
                            footerDirection === 'row-reverse' ? 'flex-row-reverse' : 'flex-row',
                            'sm:flex-row sm:justify-end'
                        )}>
                        <AlertDialogCancel className="mt-0 px-6 rounded-full">{cancelText}</AlertDialogCancel>
                        <AlertDialogAction onClick={onAction} className="px-6 rounded-full">
                            {actionText}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                )}
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogBox;
