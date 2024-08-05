"use client";

import React, { createContext, useState, useContext, ReactNode} from "react";
import { ActiveTeamContextType, TEAM } from '@/app/type';

const ActiveTeamContext = createContext<ActiveTeamContextType | undefined>(undefined);

export const ActiveTeamProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [ activeTeam, setActiveTeam ] = useState<TEAM | null>(null);

    return (
        <ActiveTeamContext.Provider value={{ activeTeam, setActiveTeam}}>
            {children}
        </ActiveTeamContext.Provider>
    )
}

export const useActiveTeam = () => {
    const context = useContext(ActiveTeamContext);
    if (context === undefined) {
        throw new Error("useActiveTeam must be used within an ActiveTeamProvider")
    }
    return context;
}