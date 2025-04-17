import { Icon } from '@/components/shared/Icon';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

interface MenuItemProps {
    item: {
        label: string;
        icon: string;
        href?: string;
        submenu?: MenuItemProps['item'][];
    };
    isCollapsed: boolean;
}

const MenuItem = ({ item, isCollapsed }: MenuItemProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const pathname = usePathname();

    const isActive = (item.href && pathname === item.href) || (item.submenu && item.submenu.some((sub) => sub.href && pathname === sub.href));

    const content = (
        <>
            <Icon name={item.icon} className="w-5 h-5" />
            {!isCollapsed && (
                <>
                    <span className="flex-1 ml-3 text-left">{item.label}</span>
                    {hasSubmenu && (
                        <span className="ml-auto">
                            <ChevronRight size={16} className={`transition-all duration-200 ease-in ${isOpen ? 'rotate-90' : ''}`} />
                        </span>
                    )}
                </>
            )}
        </>
    );

    return (
        <div className="relative">
            {item.href ? (
                <Link
                    href={item.href}
                    className={`text-sm w-full flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ease-in  ${
                        isActive ? 'text-white border border-primary bg-primary' : 'text-primary hover:bg-primary hover:text-white'
                    }`}>
                    {content}
                </Link>
            ) : (
                <button
                    onClick={() => hasSubmenu && setIsOpen(!isOpen)}
                    className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ease-in ${
                        isActive ? 'text-white border border-primary bg-primary' : 'text-primary hover:bg-primary hover:text-white'
                    }`}>
                    {content}
                </button>
            )}
            {hasSubmenu && isOpen && !isCollapsed && (
                <div className="space-y-1 mt-1 ml-4">
                    {item.submenu && item.submenu.map((subItem) => <MenuItem key={subItem.label} item={subItem} isCollapsed={isCollapsed} />)}
                </div>
            )}
        </div>
    );
};

export default MenuItem;
