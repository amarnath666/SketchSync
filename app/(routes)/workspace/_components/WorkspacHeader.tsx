import { Button } from "@/components/ui/button";
import { Link } from "lucide-react";
import React from "react";

const WorkspaceHeader = () => {
    return (
        <div className="p-3 border-b flex justify-between items-center">
            
            <div className="flex gap-2 items-center">
            <h1 className="text-orange-400 font-extrabold">SKECHSYNC</h1>
                <h2>File Name</h2>
                </div>
                <Button className="h-8 text-[12px]
            gap-2 bg-orange-500 hover:bg-orange-600">
                    Share <Link className="h-4 w-4" />
                </Button>
            
        </div>
    )
}

export default WorkspaceHeader;