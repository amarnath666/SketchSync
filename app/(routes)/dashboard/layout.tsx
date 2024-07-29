import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import React, { useEffect } from "react";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";

const DashboardLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {

    const convex = useConvex();
    const { user } : any = useKindeBrowserClient();

    useEffect(() => {

    }, [])

    const checkTeam = async() => {
        const result = await convex.query(api.teams.getTeam, {email: user?.email });
    }
    return (
        <div>
            Layout
        </div>
    )
}

export default DashboardLayout;