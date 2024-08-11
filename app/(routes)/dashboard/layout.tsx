"use client"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect, useState } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { KindeState } from "@/app/type";
import SideNav from "./_components/SideNav";
import { FileListContext } from "@/app/_context/FileListContext";
import LoadingAnimation from "@/app/_components/LoadingAnimation";

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const convex = useConvex();
    const { user }: KindeState = useKindeBrowserClient();
    const [fileList_, setFileList_] = useState();
    const [isLoading, setIsLoading] = useState(true);
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
            } else {
                setIsLoading(false);
            }
        } else {
            setIsLoading(false);
        }
    }

    if (isLoading) {
        return <LoadingAnimation />;
    }

    return (
        <FileListContext.Provider value={{ fileList_, setFileList_ }}>
            <div className="flex h-screen overflow-hidden">
                <SideNav />
                <div className="flex-1 overflow-auto">
                    {children}
                </div>
            </div>
        </FileListContext.Provider>
    )
}

export default DashboardLayout;