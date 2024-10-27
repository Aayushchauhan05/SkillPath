"use client";
import { useAuth } from '@/context/context';
import { auth } from '@/utils/firebase';
import Cookies from 'js-cookie';
import { redirect, useRouter} from 'next/navigation';
import React, { useEffect } from 'react';

function Page() {
    const router = useRouter();
    const { removeToken } = useAuth();

    useEffect(() => {
        const handleSignOut = async () => {
            try {
                await auth.signOut();
                Cookies.remove("token");
                removeToken();
                router.push("/");
            } catch (error) {
                console.error("Error signing out: ", error);
            }
        };

        handleSignOut();
    }, [router, removeToken]); 

    return <div>Signing out...</div>; 
}

export default Page;
