"use client";
import React, { useCallback, useState, useEffect } from "react";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Home, Package2, Settings } from "lucide-react";
import Link from "next/link";
import AxiosInstance from "@/lib/AxiosInstance";
import MenteeSideBar from "@/app/component/MenteeSideBar";

function Page() {
    const [listing, setListing] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const fetchData = useCallback(async () => {
        try {
            const response = await AxiosInstance.get("listing/get_all_listings");
            setListing(response.data);
        } catch (error) {
            console.error("Error fetching listings:", error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Filter listings based on search query
    const filteredListings = listing.filter((elem) =>
        elem?.topic?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem?.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem?.domain?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        elem?.mentorId?.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            <MenteeSideBar />
            <div className="flex items-center justify-center w-full mt-8">
                <div className="w-full max-w-sm min-w-[200px]">
                    <div className="relative">
                        <input
                            className="w-full py-2 pl-3 text-sm transition duration-300 bg-transparent border rounded-md shadow-sm placeholder:text-slate-400 text-slate-700 border-slate-200 pr-28 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 focus:shadow"
                            placeholder="Search by topic, domain, mentor..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button
                            className="absolute top-1 right-1 flex items-center rounded bg-slate-800 py-1 px-2.5 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                            type="button"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4 mr-2"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.5 3.75a6.75 6.75 0 1 0 0 13.5 6.75 6.75 0 0 0 0-13.5ZM2.25 10.5a8.25 8.25 0 1 1 14.59 5.28l4.69 4.69a.75.75 0 1 1-1.06 1.06l-4.69-4.69A8.25 8.25 0 0 1 2.25 10.5Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="grid w-[92vw] h-full justify-center overflow-y-auto md:ml-24">
                {filteredListings.map((elem, index) => (
                    <div
                        key={index}
                        className="mx-4 my-4 shadow-xl card bg-base-100 md:w-[85vw] md:h-[40vh]"
                    >
                        <div className="card-body">
                            <h2 className="text-3xl card-title">{elem?.topic}</h2>
                            <p className="text-xl">{elem.description}</p>
                            <p className="text-lg">Domain: {elem.domain}</p>
                            <p className="text-lg">Mentor Name: {elem.mentorId?.username}</p>
                            <p className="text-lg">Mentor Email: {elem.mentorId?.email}</p>
                            <div className="justify-end card-actions">
                                <Link
                                    href={`/mentee/marketplace/${elem._id}`}
                                    className="btn btn-primary"
                                >
                                    Visit
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Page;
