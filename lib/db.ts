import { ExcalidrawElement } from "@excalidraw/excalidraw/types/element/types";
import { AppState, BinaryFiles } from "@excalidraw/excalidraw/types/types";
import { Dexie, Table } from "dexie";

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
