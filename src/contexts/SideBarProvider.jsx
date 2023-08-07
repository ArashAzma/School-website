"use client"
import React, {createContext, useState} from "react";

export const sidebarContext = createContext();
const SidebarProvider = ({children}) => {
    const [open, setOpen] = useState(false);
    const handleSidebar = () => {
        setOpen(!open);
    }
    return(<sidebarContext.Provider value={{ open, setOpen, handleSidebar }}>{children}</sidebarContext.Provider>)
}
export default SidebarProvider;