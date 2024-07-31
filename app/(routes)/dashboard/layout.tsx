"use client"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import { KindeState } from "@/app/type";
import SideNav from "./_components/SideNav";

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    const convex = useConvex();
    const { user }: KindeState = useKindeBrowserClient();
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
        <div className="grid grid-cols-4">
            <div>
                <SideNav />
            </div>
            <div className="grid-cols-3">
                {children}
            </div>
        </div>
    )
}

export default DashboardLayout;