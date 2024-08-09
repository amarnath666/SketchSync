"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspacHeader';
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Canvas from '../_components/Canvas';
import { FILE, LayoutType } from '@/app/type';

function Workspace({ params }: any) {
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | any>();
  const [layout, setLayout] = useState<LayoutType>("both");

  useEffect(() => {
    console.log("FILEID", params.fileId)
    params.fileId && getFileData();
  }, [params.fileId])

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, { _id: params.fileId })
    setFileData(result);
  }

  return (
    <div>
      <WorkspaceHeader setLayout={setLayout} />

      {/* Workspace Layout */}
      <div className='h-screen'>
        {layout === 'text' && (
          <div className='grid grid-cols-1'>
            <Editor
              fileId={params.fileId}
              fileData={fileData}
            />
          </div>
        )}
        {layout === 'canvas' && (
          <div className='grid grid-cols-1'>
            <Canvas
              fileId={params.fileId}
              fileData={fileData}
            />
          </div>
        )}
        {layout === 'both' && (
          <div className='grid grid-cols-5'>
            {/* Document */}
            <div className='col-span-2'>
              <Editor
                fileId={params.fileId}
                fileData={fileData}
              />
            </div>
            {/* Whiteboard/canvas */}
            <div className='col-span-3 border-l'>
              <Canvas
                fileId={params.fileId}
                fileData={fileData}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Workspace