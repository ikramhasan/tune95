"use client";

import "./globals.css";
import React from "react";
import { ThemeProvider } from "styled-components";
import localFont from "next/font/local";

import { MenuList, MenuListItem, Separator, styleReset } from "react95";
// pick a theme of your choice
import original from "react95/dist/themes/original";

// const msSansSerif = localFont({
//   variable: "--font-ms_sans_serif",
//   src: [
//     {
//       path: "./fonts/ms_sans_serif.woff2",
//       weight: "500",
//       style: "normal",
//     },
//     {
//       path: "./fonts/ms_sans_serif_bold.woff2",
//       weight: "700",
//       style: "normal",
//     },
//   ],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={original}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </ThemeProvider>
  );
}
