import { Button } from "@/components/ui/button";
import React from "react";
import { LayoutType } from "@/app/type";

const WorkspaceHeader = ({ setLayout }: { setLayout: (layout: LayoutType) => void }) => {
    return (
        <div className="relative p-3 border-b flex justify-between items-center">
            <div className="flex gap-2 items-center">
                <h1 className="text-orange-400 font-extrabold">SKETCHSYNC</h1>
                <h2>File Name</h2>
            </div>
            <div className="absolute inset-0 flex justify-end items-center">
                <div className="flex gap-4">
                    <Button
                        className="w-full h-8 bg-orange-500 hover:bg-orange-600 justify-start"
                        onClick={() => setLayout('text')}
                    >
                        Text Editor
                    </Button>
                    <Button
                        className="w-full h-8 bg-orange-500 hover:bg-orange-600 justify-start"
                        onClick={() => setLayout('both')}
                    >
                        Both
                    </Button>
                    <Button
                        className="w-full h-8 bg-orange-500 hover:bg-orange-600 justify-start mr-4"
                        onClick={() => setLayout('canvas')}
                    >
                        Canvas
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default WorkspaceHeader;
