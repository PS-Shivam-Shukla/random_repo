import { ReactNode } from "react";

import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";
import PageContainer from "./PageContainer";

interface Props {
    children: ReactNode;
}

export default function AppLayout({ children }: Props) {
    return (
        <div className="flex h-screen bg-slate-950 text-white">
            <Sidebar />

            <div className="flex flex-col flex-1 overflow-hidden">

                <TopNavbar />

                <PageContainer>

                    {children}

                </PageContainer>

            </div>
        </div>
    );
}