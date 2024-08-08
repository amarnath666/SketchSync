import React, { useEffect, useState } from 'react'
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { FILE } from '@/app/type';
import { debounce } from 'lodash';
import { toast } from 'sonner';

const Canvas = ({  fileId, fileData }: {  fileId: any, fileData: FILE }) => {

    const [whiteBoardData, setWhiteBoardData] = useState<any>();
    const updateWhiteboard = useMutation(api.files.updateWhiteboard);

    const saveWhiteboard = debounce(() => {
        updateWhiteboard({
            _id: fileId,
            whiteboard: JSON.stringify(whiteBoardData)
        }).then(() => {
            // toast("whiteboard auto saved")
            // console.log("whiteboard auto saved")
        }, (e) => {
            console.log("auto save failed", e)
        })
    }, 1000);

    // useEffect(() => {
    //     onSaveTrigger && saveWhiteboard();
    // }, [onSaveTrigger])
    // const saveWhiteboard = () => {
    //     updateWhiteboard({
    //         _id: fileId,
    //         whiteboard: JSON.stringify(whiteBoardData)
    //     }).then(resp => console.log(resp))
    // }
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
                    
                // UIOptions={{
                //     canvasActions: {
                //         saveToActiveFile: true,
                //         loadScene: true,
                //         // export: true,
                //         toggleTheme: true,

                //     }
                // }}
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