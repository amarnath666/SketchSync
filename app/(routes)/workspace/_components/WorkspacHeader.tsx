import { Button } from "@/components/ui/button";
import { Link, Save } from "lucide-react";
import React from "react";

const WorkspaceHeader = () => {
    return (
        <div className="p-3 border-b flex justify-between items-center">
            
            <div className="flex gap-2 items-center">
            <h1 className="text-orange-400 font-extrabold">SKETCHSYNC</h1>
                <h2>File Name</h2>
                </div>
                <div className="flex items-center gap-4">
                {/* <Button className="h-8 text-[12px]
            gap-2 bg-yellow-500 hover:bg-yellow-600"
                onClick={() => onSave()}
            >
                    Save <Save className="h-4 w-4" />
                </Button> */}
                <Button className="h-8 text-[12px]
            gap-2 bg-orange-500 hover:bg-orange-600">
                    Share <Link className="h-4 w-4" />
                </Button>
                </div>
        </div>
    )
}

export default WorkspaceHeader;