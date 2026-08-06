import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { MobileSidebar } from "./mobile-sidebar";
import { AIStatusBar } from "./AIStatusBar";

export function AppLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Handle responsive behavior
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-collapse sidebar on mobile
  useEffect(() => {
    if (isMobile) {
      setSidebarCollapsed(true);
    }
  }, [isMobile]);

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleToggleMobileSidebar = () => {
    setMobileSidebarOpen(!mobileSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans text-foreground">
      {/* 1. Persistent Top AI Telemetry Status Bar */}
      <AIStatusBar />

      {/* 2. Main Row: Sidebar (Left) + Content Area (Right) */}
      <div className="flex flex-1 w-full min-h-0 relative">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <Sidebar 
            collapsed={sidebarCollapsed} 
            onToggleCollapse={handleToggleSidebar} 
          />
        )}

        {/* Mobile Drawer Sidebar */}
        {isMobile && (
          <MobileSidebar
            open={mobileSidebarOpen}
            onClose={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 transition-all duration-300 ease-in-out">
          {/* Top Navbar */}
          <Navbar
            sidebarCollapsed={sidebarCollapsed}
            onToggleSidebar={handleToggleSidebar}
            onToggleMobileSidebar={handleToggleMobileSidebar}
            isMobile={isMobile}
          />

          {/* Page Content Body */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="mx-auto max-w-7xl w-full">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{
                    duration: 0.2,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="w-full"
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}