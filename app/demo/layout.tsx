import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 flex flex-col">
      <h1 className="text-2xl font-bold text-center p-4">Hello Excalidraw</h1>
      {children}
    </div>
  );
};

export default layout;
