import { NavigationItems } from '@/types/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface MenuItemProps {
    item: NavigationItems;
    isCollapsed: boolean;
}

const MenuItem = ({ item, isCollapsed }: MenuItemProps) => {
    const pathname = usePathname();
    const isActive = pathname === item.href;

    return (
        <Link
            className={`text-sm w-full flex items-center px-4 py-2.5 rounded-sm transition-colors duration-200 ease-in  ${
                isActive ? 'text-primary border border-white bg-white' : 'text-white hover:bg-white hover:text-primary'
            }`}
            href={item.href}
        >
                {item.icon}
            {!isCollapsed && <span className="flex-1 ml-3 text-left">{item.label}</span>}
        </Link>
    );
};

export default MenuItem;
