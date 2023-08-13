"use client";
import React, { useCallback } from "react";
import "./styles.css";
import { debounce } from "debounce";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState, BinaryFiles } from "@excalidraw/excalidraw/types/types";
import dynamic from "next/dynamic";
import { useThemeStore } from "../layout";

const Excalidraw = dynamic(
  () => import("@excalidraw/excalidraw").then((d) => d.Excalidraw),
  {
    ssr: false,
  }
);

const Page = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  // const [Excalidraw, setExcalidraw] = useState<any>(null);

  // useEffect(() => {
  //   console.log("UEF");
  //   import("@excalidraw/excalidraw").then((comp) =>
  //     setExcalidraw(comp.Excalidraw)
  //   );
  // }, []);

  const debouncedChangeHandler = useCallback(
    debounce(
      (
        elements: readonly ExcalidrawElement[],
        appState: AppState,
        files: BinaryFiles
      ) => {
        console.log(elements, appState, files);
      },
      1000
    ),
    []
  );

  return (
    <div className="flex-grow flex flex-col excalidraw-custom">
      <Excalidraw
        theme={isDarkMode ? "dark" : "light"}
        onChange={debouncedChangeHandler}
        UIOptions={{
          canvasActions: {
            toggleTheme: false,
            changeViewBackgroundColor: false,
          },
        }}
      />
    </div>
  );
};

export default Page;
