import {
    IconlyCategory,
    IconlyDiscount,
    IconlyDocument,
    IconlyGame,
    IconlyInfoCircle,
    IconlyLocation,
    IconlySetting,
    IconlyTicketStar,
    IconlyUser,
} from '@/lib/icons/iconly';
import { NavigationItems } from '@/types/navigation';

export const navItemsData: NavigationItems[] = [
    { label: 'Dashboard', icon: <IconlyCategory />, href: '/dashboard' },
    { label: 'Leads', icon: <IconlyGame />, href: '/dashboard/profile' },
    { label: 'Clients', icon: <IconlyTicketStar />, href: '/dashboard/profile' },
    { label: 'Counsellors', icon: <IconlyLocation />, href: '/dashboard/profile' },
    { label: 'Universities', icon: <IconlyUser />, href: '/dashboard/profile' },
    { label: 'Program', icon: <IconlyInfoCircle />, href: '/dashboard/profile' },
    { label: 'Documents', icon: <IconlyDocument />, href: '/dashboard/profile' },
    { label: 'Offers', icon: <IconlyDiscount />, href: '/dashboard/profile' },
    { label: 'Settings', icon: <IconlySetting />, href: '/dashboard/profile' },
];
