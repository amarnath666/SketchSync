import { Button } from "@/components/ui/button";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Copy, Search, Send } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useMutation } from "convex/react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from "@/components/ui/dialog"
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useActiveTeam } from "@/app/_context/ActiveTeamContext";

const Header = ({ teamId }: any) => {
    const { user }: any = useKindeBrowserClient();
    const [shareLink, setShareLink] = useState("");
    const generateLink = useMutation(api.teams.generateShareLink);
    const { activeTeam } = useActiveTeam()

    const handleGenerateLink = async () => {
        try {
            const link = await generateLink({ teamId: activeTeam._id });
            setShareLink(link);
            toast("link generated sucessfully");
        } catch (e) {
            toast("error while generating link")
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
        toast("link copied")
    }

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
            <Dialog>
                <DialogTrigger>
                    <Button onClick={handleGenerateLink} className="gap-2 flex text-sm h-8 bg-orange-500
                hover:bg-orang-600
                ">
                        <Send className="h-4 w-4" />
                        Invite
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <h2>Share Link</h2>
                        <div className="mt-4">
                            {shareLink && (
                                <div className="flex mt-2 justify-between items-center">
                                    <input
                                        type="text"
                                        value={shareLink}
                                        readOnly
                                        className="w-full p-2 border rounded"
                                    />
                                    <Copy className="ml-4 w-8 h-7  hover:bg-gray-300" onClick={copyToClipboard} />
                                    {/* <Button className="ml-2 bg-orange-500 hover:bg-orange-600" onClick={copyToClipboard}>Copy</Button> */}
                                </div>
                            )}
                        </div>
                    </DialogHeader>
                    
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default Header;