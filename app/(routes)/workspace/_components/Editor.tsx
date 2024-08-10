"use client"
import React, { useEffect, useRef, useState } from 'react'
import EditorJS from '@editorjs/editorjs';
// @ts-ignore
import Header from '@editorjs/header';
// @ts-ignore
import List from "@editorjs/list";
// @ts-ignore
import Checklist from '@editorjs/checklist'
// @ts-ignore
import Paragraph from '@editorjs/paragraph';
// @ts-ignore
import Warning from '@editorjs/warning';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { FILE } from '@/app/type';
import { debounce } from 'lodash';

const DEFAULT_INITIAL_DATA = {
  "time": new Date().getTime(),
  "blocks": [
    {
      "type": "header",
      "data": {
        "text": "Welcome to Sketchsync",
        "level": 2
      }
    },
    {
      "type": "paragraph",
      "data": {
        "text": "Start typing your content here..."
      }
    }
  ]
}

const Editor = ({ fileId, fileData, updateFileData }: { fileId: any, fileData: FILE, updateFileData: (newData: Partial<FILE>) => void }) => {
  const ref = useRef<EditorJS>();
  const updateDocument = useMutation(api.files.updateDocument);

  useEffect(() => {
    if (fileData && !ref.current) {
      initEditor();
    }
  }, [fileData])

  const initEditor = () => {
    const editor = new EditorJS({
      holder: 'editorjs',
      tools: {
        header: Header,
        list: List,
        checklist: Checklist,
        paragraph: Paragraph,
        warning: Warning,
      },
      data: fileData?.document ? JSON.parse(fileData.document) : DEFAULT_INITIAL_DATA,
      onChange: debounce((api, event) => {
        onSaveDocument()
      }, 1000)
    });
    ref.current = editor;
  }

  const onSaveDocument = () => {
    if (ref.current) {
      ref.current.save().then((outputData) => {
        console.log('Article data: ', outputData);
        if (outputData && outputData.blocks && outputData.blocks.length > 0) {
          const documentString = JSON.stringify(outputData);
          updateDocument({
            _id: fileId,
            document: documentString
          }).then(resp => {
            updateFileData({ document: documentString });
            console.log('Document saved successfully');
          }, (e) => {
            console.error("Server Error!", e);
            toast("Failed to save document");
          })
        } else {
          console.warn('No valid blocks to save');
        }
      }).catch((error) => {
        console.error('Saving failed: ', error)
        toast("Failed to save document");
      });
    }
  }

  return (
    <div>
      <div id='editorjs' className='ml-20'></div>
    </div>
  )
}

export default Editor