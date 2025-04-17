'use client';

import { Search } from 'lucide-react';
// import { MobileSidebar } from "./MobileSidebar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient } from '@/lib/auth-client';
import Image from 'next/image';

import { signOut } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { MenuIcon } from '@/lib/icons/Menu';
import { PanelLeftCloseIcon } from '@/lib/icons/Panel';
import { Input } from '@/components/ui/input';

export const TopBar = ({ onToggleSidebar, isOpen }: { onToggleSidebar: () => void; isOpen: boolean }) => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const handleSignOut = async () => {
        try {
            await signOut();
            router.push('/signin');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <header className="top-0 z-10 sticky flex justify-between items-center gap-2 bg-white shadow-sm px-6 border-b border-border w-full h-16">
            <div className="flex flex-1 items-center gap-4 max-w-xl">
                {/* <MobileSidebar
                    isOpen={false}
                    onClose={function (): void {
                        throw new Error('Function not implemented.');
                    }}
                /> */}
                <PanelLeftCloseIcon className="text-gray-500 hover:text-primary" size={20} onClick={onToggleSidebar} />
                <div className="relative flex-1 ml-4 lg:ml-0">
                    <Search className="top-1/2 left-3 absolute w-5 h-5 text-primary -translate-y-1/2 transform" />
                    <input
                        type="text"
                        placeholder="Search anything here..."
                        className="py-2 pr-4 pl-10 border border-input focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-primary"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 bg-white hover:bg-background px-2 py-1 border border-border rounded-lg focus:outline-none cursor-pointer">
                        {isPending ? (
                            <div className="bg-white rounded-full w-8 h-8 animate-pulse" />
                        ) : (
                            <Image src={session?.user?.image || `/logo.png`} alt="Profile" width={32} height={32} className="rounded-full w-8 h-8" />
                        )}
                        <span className="hidden lg:block font-medium text-primary text-sm">
                            {isPending ? 'Loading...' : session?.user?.name || 'Guest'}
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border border-border w-56 text-primary">
                        <DropdownMenuLabel>My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border" />
                        <DropdownMenuItem>Profile</DropdownMenuItem>
                        <DropdownMenuItem>Settings</DropdownMenuItem>
                        <DropdownMenuItem>Billing</DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border" />
                        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer">
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    );
};
