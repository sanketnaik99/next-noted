"use client";
import React, { useEffect, useState } from "react";
import { Excalidraw } from "@excalidraw/excalidraw";
import "./styles.css";

const Page = () => {
  // const [Excalidraw, setExcalidraw] = useState<any>(null);

  // useEffect(() => {
  //   console.log("UEF");
  //   import("@excalidraw/excalidraw").then((comp) =>
  //     setExcalidraw(comp.Excalidraw)
  //   );
  // }, []);

  return (
    <div className="flex-grow flex flex-col excalidraw-custom">
      <Excalidraw theme="dark" libraryReturnUrl="" />
    </div>
  );
};

export default Page;
