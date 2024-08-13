import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LayoutType } from "@/app/type";
import Link from "next/link";

const WorkspaceHeader = ({ setLayout, fileName }: { setLayout: (layout: LayoutType) => void, fileName: string | undefined}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className='flex shadow-sm sm:px-10 bg-white min-h-[50px] tracking-wide relative z-50'>
            <div className='flex flex-wrap items-center justify-between gap-5 w-full'>
                <Link href="/dashboard">    
                    <h1 className="text-orange-400 font-extrabold cursor-pointer">SKETCHSYNC</h1>
                </Link>
                <div className="flex items-center space-x-2">
                    <h2 className="text-lg">{fileName}</h2>
                </div>

                <div id="collapseMenu" className={`lg:flex gap-4 items-center ${isMenuOpen ? 'flex' : 'hidden'} lg:block`}>
                    <Button
                        className="w-full h-8 bg-orange-500 hover:bg-orange-600 justify-start"
                        onClick={() => setLayout('text')}
                    >
                        Text Editor
                    </Button>
                    <Button
                        className="w-full h-8 bg-orange-500 hover:bg-orange-600 justify-start"
                        onClick={() => setLayout('both')}
                    >
                        Both
                    </Button>
                    <Button
                        className="w-full h-8 bg-orange-500 hover:bg-orange-600 justify-start"
                        onClick={() => setLayout('canvas')}
                    >
                        Canvas
                    </Button>
                </div>

                <div className='flex lg:hidden'>
                    <button onClick={toggleMenu} id="toggleOpen">
                        <svg className="w-7 h-7" fill="#000" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd"
                                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                                clipRule="evenodd"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default WorkspaceHeader;
