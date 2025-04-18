'use client';
import Image from 'next/image';

import { navItemsData } from '@/data/navData';

import MenuItem from './MenuItem';
import { Button } from '@/components/ui/button';
import { IconlyLogout } from '@/lib/icons/iconly';
import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';

export const Sidebar = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const router = useRouter();
    const handleSignOut = async () => {
        try {
            await signOut().then(() => {
                router.push('/signin');
            });
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <aside
            className={`bg-primary border-r border-border h-screen transition-all duration-300 fixed flex flex-col left-0 top-0 z-0 ${isCollapsed ? 'w-16' : 'w-64'}`}>
            <div className="">
                <div className="p-4 py-2">
                    <div className="flex justify-center items-center pt-5 h-20">
                        <div className="relative size-[80px]">
                            <Image fill alt="Logo" className="object-contain" src="/logo.png" />
                        </div>
                    </div>
                </div>
                <nav className="space-y-2 mt-4 px-2">
                    {navItemsData.map((item) => (
                        <MenuItem key={item.label} item={item} isCollapsed={isCollapsed} />
                    ))}
                </nav>
            </div>
            <div className="flex flex-col flex-grow justify-end items-start px-2 pb-4">
                <Button
                    className="flex items-center bg-red-400/40 hover:bg-rose-400 px-4 py-2.5 rounded-sm w-full text-white text-sm transition-colors duration-200 ease-in"
                    onClick={handleSignOut} >
                    <IconlyLogout  />
                    {!isCollapsed && <span className="flex-1 ml-3 text-left">Logout</span>}
                </Button>{' '}
            </div>
        </aside>
    );
};
