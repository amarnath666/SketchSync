"use client"
import React, { useEffect, useState } from 'react'
import WorkspaceHeader from '../_components/WorkspacHeader';
import Editor from '../_components/Editor'
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Canvas from '../_components/Canvas';
import { FILE } from '@/app/type';


function Workspace({params}:any) {
  //  const [triggerSave,setTriggerSave]=useState(false);
   const convex=useConvex();
   const [fileData,setFileData]=useState<FILE|any>();

   useEffect(()=>{
    console.log("FILEID",params.fileId)
    params.fileId && getFileData();
   },[params.fileId])

   const getFileData=async()=>{
    const result=await convex.query(api.files.getFileById,{_id:params.fileId})
    setFileData(result);
  }
  return (
    <div>
      <WorkspaceHeader />

      {/* Workspace Layout */}
      <div className='grid grid-cols-5 h-screen'>
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
    </div>
  )
}

export default Workspace
