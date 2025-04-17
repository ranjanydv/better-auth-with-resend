'use client';

import { Headset, LockIcon, LogOutIcon, Search } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import AlertDialogBox from '@/components/custom/AlertDialogBox';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { authClient, signOut } from '@/lib/auth-client';
import { PanelLeftCloseIcon } from '@/lib/icons/Panel';
import ChangePassword from '@/app/(auth)/components/change-password/ChangePasswordForm';

export const TopBar = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const [isChangePasswordDialogOpen, setIsChangePasswordDialogOpen] = useState(false);
    const [isSuccessOpen, setIsSuccessOpen] = useState(false);

    const handleSignOut = async () => {
        try {
            await signOut().then(() => {
                router.push('/signin');
            });
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };
    const handleCloseSuccess = () => {
        setIsSuccessOpen(false);
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
                        className="py-2 pr-4 pl-10 border border-input focus:border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-primary w-full text-primary"
                        placeholder="Search anything here..."
                        type="text"
                    />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2 bg-white hover:bg-background px-2 py-1 border border-border rounded-lg focus:outline-none cursor-pointer">
                        {isPending ? (
                            <div className="bg-white rounded-full w-8 h-8 animate-pulse" />
                        ) : (
                            <Image alt="Profile" className="rounded-full w-8 h-8" height={32} src={session?.user?.image || `/logo.png`} width={32} />
                        )}
                        <span className="hidden lg:block font-medium text-primary text-sm">
                            {isPending ? 'Loading...' : session?.user?.name || 'Guest'}
                        </span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border border-border w-56 text-primary">
                        <DropdownMenuLabel>
                            <div className="flex items-center gap-2">
                                <Avatar>
                                    <AvatarImage
                                        alt={isPending ? 'Loading...' : session?.user?.name || 'Guest'}
                                        src={session?.user?.image || `/logo.png`}
                                    />
                                    <AvatarFallback>NE</AvatarFallback>
                                </Avatar>
                                <div className="">
                                    <p className="font-semibold text-primary">{isPending ? 'Loading...' : session?.user?.name || 'Guest'}</p>
                                    <small className="font-medium text-gray-500 text-xs uppercase">
                                        {isPending ? 'Loading...' : session?.user?.role || 'Guest'}
                                    </small>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator className="bg-border" />
                        <DropdownMenuItem onClick={() => setIsChangePasswordDialogOpen(true)}>
                            <LockIcon size={14} /> Change Password
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Headset size={14} /> Help & Support
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 cursor-pointer">
                            <button className="flex items-center gap-2 w-full" onClick={() => setIsLogoutDialogOpen(true)}>
                                <LogOutIcon className="text-red-600" size={14} /> Log out
                            </button>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <AlertDialogBox
                    actionButtonClassName="px-8!"
                    actionText="Logout"
                    cancelText="Cancel"
                    footerClassName="w-full justify-center!"
                    isOpen={isLogoutDialogOpen}
                    size="xs"
                    title="Logout"
                    onAction={handleSignOut}
                    onClose={() => setIsLogoutDialogOpen(false)}
                >
                    <p className="-my-3 font-medium text-black text-center">Do you want to log out?</p>
                </AlertDialogBox>
                {isChangePasswordDialogOpen && (
                    <ChangePassword
                        isOpen={isChangePasswordDialogOpen}
                        onClose={() => setIsChangePasswordDialogOpen(false)}
                        onSuccess={() => {
                            setIsChangePasswordDialogOpen(false);
                            setIsSuccessOpen(true);
                            setTimeout(() => {
                                setIsSuccessOpen(false);
                            }, 5000);
                        }}
                    />
                )}
                {isSuccessOpen && (
                    <AlertDialogBox
                        hideFooter
                        showCloseButton
                        aria-label="Password Changed Successfully"
                        isOpen={isSuccessOpen}
                        size="sm"
                        title="Password Changed"
                        type="success"
                        onClose={handleCloseSuccess}
                    >
                        <div className="space-y-2">
                            <h2 className="font-semibold text-black text-xl text-center">Password Changed Successfully</h2>
                            <p className="text-gray-700 text-center">You can now use your new password to log in to your account.</p>
                        </div>
                    </AlertDialogBox>
                )}
            </div>
        </header>
    );
};
