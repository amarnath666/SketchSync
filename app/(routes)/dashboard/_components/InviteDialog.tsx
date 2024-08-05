// import { useState } from "react";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { Button } from "@/components/ui/button";
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog";
// import { Send } from "lucide-react";

// const InviteDialog = ({ teamId }: any) => {
//     const [shareLink, setShareLink] = useState("");
//     const generateLink = useMutation(api.teams.generateShareLink);

//     const handleGenerateLink = async () => {
//         const link = await generateLink({ teamId });
//         setShareLink(link);
//     };

//     const copyToClipboard = () => {
//         navigator.clipboard.writeText(shareLink);
//         //task - show copied message
//     }

//     return (
        
//     )
// }

// export default InviteDialog;