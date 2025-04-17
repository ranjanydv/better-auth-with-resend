import Image from 'next/image';

import { navigationData } from '@/data/navigation';
import { NavigationSection } from '@/types/navigation';

import MenuItem from './MenuItem';

export const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
    return (
        <aside
            className={`bg-white border-r border-border h-screen transition-all duration-300 fixed left-0 top-0 z-0 ${isCollapsed ? 'w-16' : 'w-64'}`}
        >
            <div className="p-4 py-2 border-b border-border">
                <div className="flex items-center h-12">
                    <div className="relative size-[30px]">
                        <Image fill alt="Logo" className="object-contain" src="/logo.png" />
                    </div>
                    {/* <Banana name="shopping-bag" className="w-6 h-6 text-primary" /> */}
                    {!isCollapsed && <span className="ml-3 font-bold text-primary text-2xl">Nexsus</span>}
                </div>
            </div>
            <nav className="space-y-6 mt-4 px-2">
                {navigationData.map((section) => (
                    <div key={section.title} className="space-y-2">
                        {!isCollapsed && <h3 className="px-4 font-semibold text-primary text-xs uppercase tracking-wider">{section.title}</h3>}
                        <div className="space-y-1">
                            {section.items.map((item: NavigationSection['items'][0]) => (
                                <MenuItem key={item.label} isCollapsed={isCollapsed} item={item} />
                            ))}
                        </div>
                    </div>
                ))}
            </nav>
        </aside>
    );
};
