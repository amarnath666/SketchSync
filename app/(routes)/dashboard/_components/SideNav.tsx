import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import SideNavTopSection from "./SideNavTopSection";
import SideNavBottomSection from "./SideNavBottomSection";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { FileListContext } from "@/app/_context/FileListContext";
import { useActiveTeam } from "@/app/_context/ActiveTeamContext";
import { Menu, X } from "lucide-react";

const SideNav = () => {
  const { user }: any = useKindeBrowserClient();
  const createFile = useMutation(api.files.createFile);
  const { activeTeam } = useActiveTeam();
  const [totalFiles, setTotalFiles] = useState<Number>();
  const { fileList_, setFileList_ } = useContext(FileListContext);
  const [isOpen, setIsOpen] = useState(false);

  const files = useQuery(
    api.files.getFiles,
    activeTeam ? { teamId: activeTeam._id } : "skip"
  );

  useEffect(() => {
    if (files) {
      setFileList_(files);
    }
  }, [files, setFileList_]);

  const onFileCreate = (fileName: string) => {
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
        toast("File created successfully!")
      }
    }, (e) => {
      toast("Error while creating file")
    });
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Sidebar */}
      <div 
        className={`
          fixed inset-y-0 left-0 z-40 w-64 bg-white
          transform ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:inset-auto md:h-screen
          border-r border-[1px] py-6 px-2 flex flex-col
        `}
      >
       <div className={`flex-1 overflow-y-auto mt-4 md:mt-0`}>
          <SideNavTopSection user={user} />
        </div>
        <div>
          <SideNavBottomSection
            onFileCreate={onFileCreate}
            totalFiles={files?.length || 0}
          />
        </div>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  )
}

export default SideNav;