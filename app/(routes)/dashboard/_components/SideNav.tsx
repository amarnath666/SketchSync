import Image from "next/image";
import React from "react";
import {Archive, ChevronDown, Flag, Github } from "lucide-react";
import SideNavTopSection from "./SideNavTopSection"; 
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { KindeState } from "@/app/type";
import SideNavBottomSection from "./SideNavBottomSection";

const SideNav = () => {
   const {user} = useKindeBrowserClient();
   const onFileCreate = (fileName: string) => {
    console.log(fileName)
   }
 return (
    <div className="h-screen fixed w-72 border-r 
    border-[1px] py-6 p-2 flex flex-col">
      <div className="flex-1">
      <SideNavTopSection user={user}/>
      </div>
      <div>
        <SideNavBottomSection onFileCreate={onFileCreate} />
      </div>
    </div>
 )
}

export default SideNav;