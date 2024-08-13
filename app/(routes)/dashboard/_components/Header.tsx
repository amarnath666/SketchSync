import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { HeaderProps } from "@/app/type";

const Header: React.FC<HeaderProps> = ({ searchQuery, setSearchQuery }) => {
    const { user }: any = useKindeBrowserClient();

    return (
        <div className="flex justify-end w-full gap-2 items-center">
            <div className=" flex gap-2 items-center border rounded-md p-1">
                <Search className="h- w-4 " />
                <input 
                    type=" text" 
                    placeholder="Search by file name"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <div>
                <Image src={user?.picture} alt="user"
                    width={30}
                    height={30}
                    className="rounded-full"
                />
            </div>
        </div>
    )
}

export default Header;