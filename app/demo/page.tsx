"use client";
import React, { useCallback, useContext, useEffect, useState } from "react";
import "./styles.css";
import { debounce } from "debounce";
import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import {
  AppState,
  BinaryFiles,
  ExcalidrawAPIRefValue,
  ExcalidrawImperativeAPI,
} from "@excalidraw/excalidraw/types/types";
import { Excalidraw as ExcalidrawType } from "@excalidraw/excalidraw/types/packages/excalidraw/index";
import dynamic from "next/dynamic";
import { useThemeStore } from "../layout";
import { Mutable } from "@excalidraw/excalidraw/types/utility-types";
import { useLiveQuery } from "dexie-react-hooks";
import { Dexie, Table } from "dexie";
import { Button } from "@/components/ui/button";
import {
  FilePlus,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  Star,
} from "lucide-react";

// const Excalidraw = dynamic(
//   () => import("@excalidraw/excalidraw").then((d) => d.Excalidraw),
//   {
//     ssr: false,
//   }
// );

export interface Note {
  id?: number;
  title: string;
  excalidrawElements: ExcalidrawElement[];
  excalidrawAppState: AppState;
  excalidrawFiles: BinaryFiles;
  createdAt: string;
  updatedAt: string;
}

export class NotesSubClassedDexie extends Dexie {
  notes!: Table<Note>;

  constructor() {
    super("noted");
    this.version(1).stores({
      notes:
        "++id, title, excalidrawElements, excalidrawAppState, excalidrawFiles, createdAt, updatedAt",
    });
  }
}

export const db = new NotesSubClassedDexie();

const Page = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedNoteId, setSelectedNoteId] = useState(0);
  const allItems = useLiveQuery(() => db.notes.toArray(), []);
  const [excalidrawAPI, setExcalidrawAPI] =
    useState<ExcalidrawImperativeAPI | null>(null);
  const [Excalidraw, setExcalidraw] = useState<typeof ExcalidrawType | null>(
    null
  );

  useEffect(() => {
    import("@excalidraw/excalidraw").then((comp) =>
      setExcalidraw(comp.Excalidraw)
    );
  }, []);

  // const [Excalidraw, setExcalidraw] = useState<any>(null);

  // useEffect(() => {
  //   console.log("UEF");
  //   import("@excalidraw/excalidraw").then((comp) =>
  //     setExcalidraw(comp.Excalidraw)
  //   );
  // }, []);

  console.log("ALL ITEMS", allItems);

  const handleAddNote = async () => {
    const note = await db.notes.add({
      title: "Untitled",
      excalidrawElements: [],
      excalidrawAppState: excalidrawAPI?.getAppState() as Mutable<AppState>,
      excalidrawFiles: {},
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    setSelectedNoteId(note);
    console.log("ADDED NOTE", note);
    excalidrawAPI?.resetScene();
    excalidrawAPI?.updateScene({
      elements: [],
      appState: excalidrawAPI?.getAppState() as Mutable<AppState>,
    });
  };

  const debouncedChangeHandler = useCallback(
    debounce(
      async (
        elements: readonly ExcalidrawElement[],
        appState: AppState,
        files: BinaryFiles
      ) => {
        console.log(elements, appState, files);
        const elementsCopy = elements as Mutable<typeof elements>;
        if (selectedNoteId) {
          const note = await db.notes.update(selectedNoteId, {
            excalidrawElements: elementsCopy,
            excalidrawAppState: appState,
            excalidrawFiles: files,
            updatedAt: new Date().toISOString(),
          });
          console.log("Updated note", note);
        }
      },
      1000
    ),
    [selectedNoteId]
  );

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
                "rounded-xl cursor-pointer p-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-300 hover:text-teal-500",
                isSidebarOpen ? "" : "mx-auto",
              ].join(" ")}
              onClick={() => handleAddNote()}
            >
              <FilePlus />
            </div>
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
      <div className="flex-grow flex flex-col excalidraw-custom">
        {Excalidraw && (
          <Excalidraw
            theme={isDarkMode ? "dark" : "light"}
            ref={(api) => {
              console.log("IS API READY?", api?.ready);
              if (api?.ready) {
                setExcalidrawAPI(api);
              }
            }}
            onChange={debouncedChangeHandler}
            UIOptions={{
              canvasActions: {
                toggleTheme: false,
                changeViewBackgroundColor: false,
              },
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Page;
