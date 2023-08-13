"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Home, PanelLeftClose, PanelLeftOpen, Star } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-row">
      <div
        className={[
          "flex flex-col bg-background transition-all duration-300 border-r-2 border-gray-200 dark:border-gray-800",
          isSidebarOpen ? "w-64" : "w-14",
        ].join(" ")}
      >
        <div
          className={[
            "flex flex-row-reverse",
            !isSidebarOpen ? "justify-center pt-4 p-1" : "p-4",
          ].join(" ")}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsSidebarOpen((current) => !current)}
          >
            {isSidebarOpen ? <PanelLeftClose /> : <PanelLeftOpen />}
          </Button>
        </div>
        <div
          className={[
            "flex flex-row h-full justify-center",
            isSidebarOpen
              ? "border-t-2 border-gray-200 dark:border-gray-800"
              : "pt-4",
          ].join(" ")}
        >
          <div
            className={[
              "flex flex-col items-center gap-2 grow-0",
              isSidebarOpen
                ? "p-2 border-r-2 border-gray-200 dark:border-gray-800"
                : "mx-auto",
            ].join(" ")}
          >
            <div
              className={[
                "rounded-xl cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300 hover:text-primary",
                isSidebarOpen ? "" : "mx-auto",
              ].join(" ")}
              onClick={() => setIsSidebarOpen(true)}
            >
              <Home />
            </div>
            <div
              className={[
                "rounded-xl cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300 hover:text-yellow-500",
                isSidebarOpen ? "" : "mx-auto",
              ].join(" ")}
              onClick={() => setIsSidebarOpen(true)}
            >
              <Star />
            </div>
          </div>
          {isSidebarOpen && (
            <div className="px-2 mt-2 flex flex-col items-center gap-2">
              {[...Array(5)].map((_, index) => (
                <div key={index}>Some random note goes here</div>
              ))}
            </div>
          )}
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
