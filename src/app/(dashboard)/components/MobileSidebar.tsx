import React from 'react';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';

import { Sidebar } from './Sidebar';

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
    return (
        <div className="lg:hidden">
            <Sheet open={isOpen} onOpenChange={onClose}>
                <SheetTrigger asChild>
                    <Button className="top-3 left-4 z-50 fixed" size="icon" variant="outline">
                        ☰
                    </Button>
                </SheetTrigger>
                <SheetContent className="p-0 w-64" side="left">
                    <SheetTitle className="sr-only">Menu</SheetTitle>
                    <SheetHeader>
                        <h2 className="px-4 py-2 font-bold text-lg">Menu</h2>
                    </SheetHeader>
                    <Sidebar isCollapsed={false} />
                </SheetContent>
            </Sheet>
        </div>
    );
}
