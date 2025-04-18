import { NavigationSection } from '../types/navigation';

export const navigationData: NavigationSection[] = [
    {
        title: 'Main',
        items: [
            { label: 'Dashboard', icon: 'layoutDashboard', href: '/dashboard' },
            { label: 'Dashboard', icon: 'layoutDashboard', href: '/dashboard' },
            { label: 'Leads', icon: 'user', href: '/dashboard/profile' },
            { label: 'Clients', icon: 'user', href: '/dashboard/profile' },
            { label: 'Counsellors', icon: 'user', href: '/dashboard/profile' },
            { label: 'Universities', icon: 'user', href: '/dashboard/profile' },
            { label: 'Program', icon: 'user', href: '/dashboard/profile' },
            { label: 'Documents', icon: 'user', href: '/dashboard/profile' },
            { label: 'Offers', icon: 'user', href: '/dashboard/profile' },
            { label: 'Settings', icon: 'user', href: '/dashboard/profile' },
        ],
    },
    // {
    //     title: 'Web Apps',
    //     items: [
    //         {
    //             label: 'Email',
    //             icon: 'mail',
    //             submenu: [
    //                 { label: 'Inbox', icon: 'inbox', href: '/email/inbox',  },
    //                 { label: 'penLine', icon: 'pen', href: '/email/compose' },
    //             ],
    //         },
    //         { label: 'Calendar', icon: 'calendar', href: '/calendar' },
    //     ],
    // },
];
