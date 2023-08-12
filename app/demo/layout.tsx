"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Home, PanelLeftClose, PanelLeftOpen } from "lucide-react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-row">
      <div
        className={[
          "flex flex-col bg-card transition-all duration-300 border-r-2 border-gray-200",
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
            "flex flex-row p-4",
            isSidebarOpen ? "justify-center" : "",
          ].join(" ")}
        >
          <Home className={isSidebarOpen ? "mr-4" : "m-auto"} />
          <h5
            className={[
              "text-lg font-semibold",
              isSidebarOpen ? "block opacity-100" : "hidden opacity-0",
            ].join(" ")}
          >
            Home
          </h5>
        </div>
      </div>
      {children}
    </div>
  );
};

export default Layout;
