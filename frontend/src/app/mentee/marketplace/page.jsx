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
import MenteeSideBar from "@/app/component/MenteeSideBar"
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
           <MenteeSideBar/>
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
                                <Link href={`/mentee/marketplace/${elem._id}`} className="btn btn-primary">Visit</Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
