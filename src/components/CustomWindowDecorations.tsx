"use client";

import React from "react";
import { Button, Window, WindowHeader } from "react95";
// import { appWindow } from "@tauri-apps/api/window";

export const CustomWindowDecorations = () => {
  return (
    <Window className="sticky top-0 left-0 right-0 w-screen">
      <WindowHeader className="flex items-center justify-between">
        <span>tune95.exe</span>

        <Button
          onClick={() => {
            // appWindow.close();
          }}
        >
          <span>X</span>
        </Button>
      </WindowHeader>
    </Window>
  );
};
