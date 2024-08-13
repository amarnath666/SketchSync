import React, { useEffect, useState } from 'react'
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '@/app/type';
import { debounce } from 'lodash';
import { toast } from 'sonner';

const Canvas = ({ fileId, fileData, updateFileData }: { fileId: any, fileData: FILE, updateFileData: (newData: Partial<FILE>) => void }) => {

    const [whiteBoardData, setWhiteBoardData] = useState<any>();
    const updateWhiteboard = useMutation(api.files.updateWhiteboard);

    const saveWhiteboard = debounce(() => {
        const whiteboardString = whiteBoardData ? JSON.stringify(whiteBoardData) : "";
        updateWhiteboard({
            _id: fileId,
            whiteboard: whiteboardString
        }).then(() => {
            updateFileData({ whiteboard: whiteboardString });
        }, (e) => {
            console.log("auto save failed", e)
        })
    }, 1000);

    return (
        <div style={{ height: "670px" }}>
            {fileData && <Excalidraw
                theme='light'
                initialData={{
                    elements: fileData?.whiteboard && JSON.parse(fileData?.whiteboard)
                }}
                onChange={(excalidrawElements, appState, files) => {
                    setWhiteBoardData(excalidrawElements);
                    saveWhiteboard();
                }}
            >
                <MainMenu>
                    <MainMenu.DefaultItems.ClearCanvas />
                    <MainMenu.DefaultItems.SaveAsImage />
                    <MainMenu.DefaultItems.ChangeCanvasBackground />
                </MainMenu>
                <WelcomeScreen>
                    <WelcomeScreen.Hints.MenuHint />
                    <WelcomeScreen.Hints.MenuHint />
                    <WelcomeScreen.Hints.ToolbarHint />
                    <WelcomeScreen.Center>
                        <WelcomeScreen.Center.MenuItemHelp />
                    </WelcomeScreen.Center>
                </WelcomeScreen>
            </Excalidraw>}
        </div>
    )
}

export default Canvas