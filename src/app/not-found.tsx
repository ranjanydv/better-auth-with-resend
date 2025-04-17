'use client';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from '@/components/ui/button';

const NotFound = () => {
    const router = useRouter();

    return (
        <main className="h-screen min-h-screen overflow-hidden">
            <div className="flex flex-col justify-center items-center h-full">
                <div className="relative h-[55vh] aspect-square">
                    <Image fill alt="Not Found" className="object-contain" quality={100} src={'/404.svg'} />
                </div>
                <div className="flex flex-col justify-center items-center gap-2 pb-20">
                    <div className="space-y-1">
                        <h1 className="font-bold text-primary text-5xl text-center">Oops!</h1>
                        <p className="text-gray-700">Page not found. There seems to be an error. </p>
                    </div>
                    <Button className="px-4! rounded-full" size={'sm'} onClick={() => router.back()}>
                        <ArrowLeft /> Go Back
                    </Button>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
