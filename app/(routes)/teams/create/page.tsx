"use client"

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useConvex, useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { KindeState } from "@/app/type";

const CreateTeam = () => {
    const [teamName, setTeamName] = useState('');
    const createTeam = useMutation(api.teams.createTeam);
    const { user }: any = useKindeBrowserClient();
    const router = useRouter();
    const convex = useConvex();

    // useEffect(() => {
    //     user && getTeamId();
    // }, [user])

    const createNewTeam = () => {
        createTeam({
            teamName: teamName,
            createdBy: user.email
        }).then(res => {
            console.log(res);
            if (res) {
                router.push("/dashboard")
                toast("Team created succesfully!!!")
            }
        })
    }

    // const getTeamId = async () => {
    //     const result = await convex.query(api.teams.getTeam, { email: user.email });
    //     console.log("TeamId", result);
    // }

    // const handleInvite = async (teamId : any) => {
    //     const link = await generateShareLink(teamId)
    // }

    // const generateShareLink = async (teamId : any) => {
    //     return `http://localhost:3000/invite/${teamId}`
    // }
    return (
        <div className="px-6 md:px-16 my-16">
            <h1 className="text-orange-400 font-extrabold">SKETCHSYNC</h1>
            <div className="flex flex-col items-center mt-8">
                <h2 className="font-bold text-[40px] py-3">What should we call your team?</h2>
                <h2 className="text-gray-500">You can always change this later from settings</h2>
                <div className="mt-7 w-[30%]">
                    <label className="text-gray-500">Team Name</label>
                    <Input
                        placeholder="Team Name"
                        className="mt-3"
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </div>
                <Button
                    className="bg-orange-400 mt-9 w-[30%] 
                    hover:bg-orange-500"
                    disabled={!(teamName && teamName?.length > 0)}
                    onClick={() => createNewTeam()}
                >Create Team</Button>
            </div>
        </div>
    )
}

export default CreateTeam;