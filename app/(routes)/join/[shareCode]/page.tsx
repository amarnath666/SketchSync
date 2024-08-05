"use client"

import React, { useEffect } from "react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useActiveTeam } from "@/app/_context/ActiveTeamContext";

const JoinTeam = () => {
    const params = useParams();
    const router = useRouter();
    const {user} : any = useKindeBrowserClient();
    const addMember = useMutation(api.teams.addMemberToTeam);
    const shareCode = params.shareCode as string;
    const { setActiveTeam } = useActiveTeam();

    useEffect(() => {
        const joinTeam = async () => {
            if (shareCode && user?.email) {
                try {
                    const result = await addMember({
                        shareCode: shareCode,
                        memberEmail: user.email
                    });
                    if (result.success) {
                        setActiveTeam({ _id: result.teamId, teamName: result.teamName });
                        router.replace("/dashboard");
                        toast("Successfully joined new team!!!");
                    }
                } catch(e) {
                    toast("Error while adding member");
                }
            }
        };
        
        joinTeam();
    }, [shareCode, user, addMember, router, setActiveTeam]);

    return (
        <div>
            Joining team...
        </div>
    )
}

export default JoinTeam;