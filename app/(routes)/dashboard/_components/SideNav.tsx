import Image from "next/image";
import React, { act, useContext, useEffect, useState } from "react";
import SideNavTopSection from "./SideNavTopSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeState, TEAM } from "@/app/type";
import SideNavBottomSection from "./SideNavBottomSection";
import { useConvex, useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FileListContext";
import { useActiveTeam } from "@/app/_context/ActiveTeamContext";

const SideNav = () => {
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const { activeTeam } = useActiveTeam();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const { fileList_, setFileList_ } = useContext(FileListContext);
  // const convex = useConvex();

  const files = useQuery(
    api.files.getFiles, 
    activeTeam ? { teamId: activeTeam._id } : "skip"
  );

  useEffect(() => {
    console.log("files:", files)
    if (files) {
      setFileList_(files);
    }
  }, [files, setFileList_])

  const onFileCreate = (fileName: string) => {
    console.log(fileName)
    if (!activeTeam) {
      toast("Please select a team first");
      return;
    }
    createFile({
      fileName: fileName,
      teamId: activeTeam?._id,
      createdBy: user?.email,
      archive: false,
      document: "",
      whiteboard: ""
    }).then(res => {
      if (res) {
        // getFiles();
        toast("File created successfully!")
      }
    }, (e) => {
      toast("Error while creating file")
    })
  }

  // const getFiles = async () => {
  //   const result = await convex.query(api.files.getFiles, { teamId: activeTeam?._id });
  //   setFileList_(result);
  //   setTotalFiles(result?.length);
  // }

  return (
    <div className="h-screen fixed w-72 border-r 
    border-[1px] py-6 p-2 flex flex-col">
      <div className="flex-1">
        <SideNavTopSection user={user} />
      </div>
      <div>
        <SideNavBottomSection
          onFileCreate={onFileCreate}
          totalFiles={files?.length || 0}
        />
      </div>
    </div>
  )
}

export default SideNav;