"use client"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { KindeState } from "@/app/type";
import SideNav from "./_components/SideNav";
import { FileListContext } from "@/app/_context/FileListContext";

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const convex = useConvex();
    const { user }: KindeState = useKindeBrowserClient();
    const [fileList_, setFileList_] = useState()
    const router = useRouter();
    useEffect(() => {
        if (user && user.email) {
            checkTeam();
        }
    }, [user])

    const checkTeam = async () => {
        if (user && user.email) {
            const result = await convex.query(api.teams.getTeam, { email: user.email });

            if (!result?.length) {
                router.push("teams/create")
            }
        }
    }

    return (
        <FileListContext.Provider value={{fileList_, setFileList_}}>
            <div className="grid grid-cols-4">
                <div className="h-screen w-72 fixed">
                    <SideNav />
                </div>
                <div className="col-span-4 ml-72">
                    {children}
                </div>
            </div>
        </FileListContext.Provider>
    )
}

export default DashboardLayout;