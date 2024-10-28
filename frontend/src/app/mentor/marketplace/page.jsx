"use client";
import React, { useCallback, useState, useEffect } from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip"; 
import {
    Home,
    Package2,
    Settings,
} from "lucide-react";
import Link from "next/link";
import AxiosInstance from '@/lib/AxiosInstance';

function Page() {
    const [listing, setListing] = useState([]);

    const fetchData = useCallback(async () => {
        try {
            const response = await AxiosInstance.get("listing/get_all_listings");
            setListing(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <div>
            <TooltipProvider>
                <aside className="fixed inset-y-0 left-0 z-10 flex-col hidden border-r w-14 bg-background md:flex">
                    <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
                        <Link
                            href="#"
                            className="flex items-center justify-center gap-2 text-lg font-semibold rounded-full group h-9 w-9 shrink-0 bg-primary text-primary-foreground md:h-8 md:w-8 md:text-base"
                        >
                            <Package2 className="w-4 h-4 transition-all group-hover:scale-110" />
                            <span className="sr-only">Acme Inc</span>
                        </Link>
                        
                        {/* Tooltip examples */}
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href={"/mentor/dashboard"}
                                    className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Home className="w-5 h-5" />
                                    <span className="sr-only">Dashboard</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Dashboard</TooltipContent>
                        </Tooltip>

                        {/* Repeat for other Tooltips... */}

                    </nav>
                    <nav className="flex flex-col items-center gap-4 px-2 mt-auto sm:py-5">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link
                                    href="#"
                                    className="flex items-center justify-center transition-colors rounded-lg h-9 w-9 text-muted-foreground hover:text-foreground md:h-8 md:w-8"
                                >
                                    <Settings className="w-5 h-5" />
                                    <span className="sr-only">Settings</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side="right">Settings</TooltipContent>
                        </Tooltip>
                    </nav>
                </aside>
            </TooltipProvider>
            <div className='grid w-[92vw] h-full justify-center overflow-y-auto md:ml-24'>
                {listing.map((elem, index) => (
                    <div key={index} className="mx-4 my-4 shadow-xl card bg-base-100 md:w-[85vw] md:h-[40vh]">
                        <div className="card-body">
                            <h2 className="text-3xl card-title">{elem?.topic}</h2>
                            <p className='text-xl'>{elem.description}</p>
                            <p className='text-lg'>domain: {elem.domain}</p>
                            <p className='text-lg'>mentor name: {elem.mentorId.username}</p>
                            <p className='text-lg'>mentor email: {elem.mentorId.email}</p>
                            <div className="justify-end card-actions">
                                <button className="btn btn-primary">{`Pay now ₹${elem?.sessionPrice}`}</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
