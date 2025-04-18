import React from 'react';

export interface NavigationSection {
    title: string;
    items: {
        label: string;
        icon: string;
        href?: string;
        submenu?: {
            label: string;
            icon: string;
            href: string;
        }[];
    }[];
}
export interface NavigationItems {
    label: string;
    icon: React.ReactNode;
    href: string;
}
