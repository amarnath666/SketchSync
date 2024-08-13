"use client"
import React, { useEffect, useState, useCallback } from 'react'
import WorkspaceHeader from '../_components/WorkspacHeader';
import Editor from '../_components/Editor'
import { useConvex, useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Canvas from '../_components/Canvas';
import { FILE, LayoutType } from '@/app/type';
import { debounce } from 'lodash';

function Workspace({ params }: { params: { fileId: any } }) {
  const convex = useConvex();
  const [fileData, setFileData] = useState<FILE | null>(null);
  const [layout, setLayout] = useState<LayoutType>("both");
  const updateWhiteboard = useMutation(api.files.updateWhiteboard);
  const updateDocument = useMutation(api.files.updateDocument);

  useEffect(() => {
    params.fileId && getFileData();
  }, [params.fileId])

  const getFileData = async () => {
    const result = await convex.query(api.files.getFileById, { _id: params.fileId });
    setFileData(result as FILE);
  }

  const saveAll = useCallback(async () => {
    if (fileData) {
      await Promise.all([
        updateWhiteboard({
          _id: params.fileId,
          whiteboard: fileData.whiteboard || ''
        }),
        updateDocument({
          _id: params.fileId,
          document: fileData.document || ''
        })
      ]);
    }
  }, [fileData, params.fileId, updateWhiteboard, updateDocument]);

  const handleLayoutChange = debounce(async (newLayout: LayoutType) => {
    await saveAll();
    setLayout(newLayout);
  }, 1000);

  const updateFileData = (newData: Partial<FILE>) => {
    setFileData((prevData: FILE | null) => {
      if (prevData === null) return null;
      return {
        ...prevData,
        ...newData
      };
    });
  };

  useEffect(() => {
    return () => {
      saveAll(); // Save when unmounting
    };
  }, [saveAll]);

  return (
    <div>
      <WorkspaceHeader setLayout={handleLayoutChange} fileName={fileData?.fileName} />

      <div className='h-screen'>
        {layout === 'text' && (
          <div className='grid grid-cols-1'>
            <Editor
              fileId={params.fileId}
              fileData={fileData}
              updateFileData={updateFileData}
            />
          </div>
        )}
        {layout === 'canvas' && (
          <div className='grid grid-cols-1'>
            <Canvas
              fileId={params.fileId}
              fileData={fileData}
              updateFileData={updateFileData}
            />
          </div>
        )}
        {layout === 'both' && (
          <div className='grid grid-cols-1 lg:grid-cols-5'>
            <div className='h-screen lg:col-span-2'>
              <Editor
                fileId={params.fileId}
                fileData={fileData}
                updateFileData={updateFileData}
              />
            </div>
            <div className='lg:col-span-3 border-l'>
              <Canvas
                fileId={params.fileId}
                fileData={fileData}
                updateFileData={updateFileData}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Workspace