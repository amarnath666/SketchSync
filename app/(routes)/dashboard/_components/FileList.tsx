import { FileListContext } from "@/app/_context/FileListContext";
import { FILE } from "@/app/type";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Archive, MoreHorizontal } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import moment from "moment";
import BeatLoader from "react-spinners/BeatLoader";

interface FileListProps {
    searchQuery: string;
}

const FileList: React.FC<FileListProps> = ({ searchQuery }) => {
    const { fileList_, setFileList_ } = useContext(FileListContext);
    const [fileList, setFileList] = useState<any>();
    const [loading, setLoading] = useState(false);
    const { user }: any = useKindeBrowserClient();
    const router = useRouter();
    const [filteredFiles, setFilteredFiles] = useState<FILE[]>([]);

    useEffect(() => {
        if (fileList_) {
            setFileList(fileList_);
            setFilteredFiles(fileList_);
        }
    }, [fileList_]);

    useEffect(() => {
        if (fileList && searchQuery) {
            const filtered = fileList.filter((file: FILE) =>
                file.fileName.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredFiles(filtered);
        } else {
            setFilteredFiles(fileList); 
        }
    }, [searchQuery, fileList]);

    const handleFileClick = (fileId: any) => {
        setLoading(true);
        if (router.push(`/workspace/${fileId}`)) setLoading(false);
    };

    return (
        <div className="mt-10">
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">File Name</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created At</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Edited</td>
                            <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Author</td>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {loading && (
                            <tr className="relative h-20">
                                <td className="absolute inset-0 flex items-center justify-center">
                                    <BeatLoader color="#F97316" />
                                </td>
                            </tr>
                        )}
                        {!loading && filteredFiles && filteredFiles.map((file: FILE, index: number) => (
                            <tr
                                key={index}
                                className="odd:bg-gray-50 cursor-pointer hover:bg-slate-100"
                                onClick={() => handleFileClick(file._id)}
                            >
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {file.fileName}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {moment(file._creationTime).format("DD-MM-YYYY")}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    {moment(file._creationTime).format("DD-MM-YYYY")}
                                </td>
                                <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                                    <Image
                                        src={user?.picture}
                                        alt="user"
                                        width={30}
                                        height={30}
                                        className="rounded-full"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FileList;