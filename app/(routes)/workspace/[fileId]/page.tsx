import React from "react";
import WorkspaceHeader from "../_components/WorkspacHeader";
import Editor from "../_components/Editor";

const Workspace = () => {
    return (
        <div>
            <WorkspaceHeader />

            {/* Workspace Layout */}
            <div className="grid grid-cols-1 
            md:grid-cols-2
            ">
                {/* Documents */}
                <div className="h-screen">
                    <Editor />
                </div>

                {/* Whiteboard/canvas */}
                <div className="bg-orange-500 h-screen">
                    canvas
                </div>
            </div>
        </div>
    )
}

export default Workspace;