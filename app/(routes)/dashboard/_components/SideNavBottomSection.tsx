import React, { useState } from "react";
import { Archive, Flag, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { DialogClose } from "@radix-ui/react-dialog";


const SideNavBottomSection = ({onFileCreate}: any) => {
    const [fileInput, setFileInput] = useState("")
    const menuList = [
        {
            id: 1,
            name: "Getting Started",
            icon: Flag,
            path: ""
        },
        {
            id: 1,
            name: "Github",
            icon: Github,
            path: ""
        },
        {
            id: 1,
            name: "Archive",
            icon: Archive,
            path: ""
        },
    ]

    // const onFileCreate = (fileInput) => {

    // }
    return (
        <div>
            {menuList.map((menu, index) => (
                <h2 key={index} className="flex gap-2 p-1 px-2 text-[14px]
                hover:bg-gray-100 rounded-md cursor-pointer
                ">
                    <menu.icon className="h-5 w-5" />
                    {menu.name}</h2>
            ))}
            {/* Add New File Button */}
            <Dialog>
                <DialogTrigger className="w-full">
                    <Button className="w-full bg-orange-500 hover:bg-orange-500
            justify-start mt-3">
                        New File
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New File</DialogTitle>
                        <DialogDescription>
                            <Input placeholder="Enter File Name" className="mt-3"
                            onChange={(e) => setFileInput(e.target.value)} />
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="">
                        <DialogClose asChild>
                            <Button type="button"
                                className="bg-orange-500 hover:bg-orange-600"
                                disabled={!(fileInput && fileInput.length > 0)}
                                onClick={() => onFileCreate(fileInput)}
                                >
                                Create
                            </Button>
                        </DialogClose>
                    </DialogFooter>

                </DialogContent>
            </Dialog>

            {/* Progress Bar */}
            <div className="h-4 w-full bg-gray-200 rounded-full mt-5">
                <div className="h-4 w-[40%] bg-orange-500 rounded-full">

                </div>
            </div>
            <h2 className="text-[12px] mt-3">
                <strong>1</strong> out of <strong>5</strong> files used</h2>
            <h2 className="text-[12px] mt-1">Upgrade your plan for unlimited access.</h2>
        </div>
    )
}

export default SideNavBottomSection;