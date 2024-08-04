import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Send } from "lucide-react";

const InviteDialog = ({ teamId }: any) => {
    const [shareLink, setShareLink] = useState("");
    const generateLink = useMutation(api.teams.generateShareLink);

    const handleGenerateLink = async () => {
        const link = await generateLink({ teamId });
        setShareLink(link);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shareLink);
        //task - show copied message
    }

    return (
        <Dialog>
            <DialogTrigger>
                <Button className="gap-2 flex text-sm h-8 bg-orange-500
                hover:bg-orang-600
                ">
                    <Send className="h-4 w-4" />
                    Invite
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <div className="mt-4">
                        <Button onClick={handleGenerateLink}>Generate Share Link</Button>
                        {shareLink && (
                            <div className="mt-2">
                                <input
                                    type="text"
                                    value={shareLink}
                                    readOnly
                                    className="w-full p-2 border rounded"
                                />
                                <Button onClick={copyToClipboard}>Copy Link</Button>
                            </div>
                        )}
                    </div>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}

export default InviteDialog;