import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Search, Send } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import InviteDialog from "./InviteDialog";

const Header = ({teamId}: any) => {
    const { user }: any = useKindeBrowserClient();
    return (
        <div className="flex justify-end w-full gap-2 items-center">
            <div className=" flex gap-2 items-center border rounded-md p-1">
                <Search className="h- w-4 " />
                <input type=" text" placeholder="Search" />
            </div>
            <div>
                <Image src={user?.picture} alt="user"
                    width={30}
                    height={30}
                    className="rounded-full"
                />
            </div>
            <InviteDialog teamId={teamId}/>
        </div>
    )
}

export default Header;