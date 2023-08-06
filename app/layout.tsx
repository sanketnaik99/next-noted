"use client";

// Libraries
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

// Components
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import NavbarLink from "@/components/navbar/navbar-link/NavbarLink";

// Styles
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  return (
    <html lang="en">
      <body
        className={
          isDarkMode
            ? "dark w-full min-h-screen flex flex-col"
            : "w-full min-h-screen flex flex-col"
        }
      >
        <nav className="border-b-2 border-gray-200 dark:border-gray-800 p-2 md:p-4">
          <div className="w-full mx-auto">
            <div className="mx-2 flex flex-wrap items-center justify-between">
              <Link href="/" className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7 mr-2"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.315 7.584C12.195 3.883 16.695 1.5 21.75 1.5a.75.75 0 01.75.75c0 5.056-2.383 9.555-6.084 12.436A6.75 6.75 0 019.75 22.5a.75.75 0 01-.75-.75v-4.131A15.838 15.838 0 016.382 15H2.25a.75.75 0 01-.75-.75 6.75 6.75 0 017.815-6.666zM15 6.75a2.25 2.25 0 100 4.5 2.25 2.25 0 000-4.5z"
                    clipRule="evenodd"
                  />
                  <path d="M5.26 17.242a.75.75 0 10-.897-1.203 5.243 5.243 0 00-2.05 5.022.75.75 0 00.625.627 5.243 5.243 0 005.022-2.051.75.75 0 10-1.202-.897 3.744 3.744 0 01-3.008 1.51c0-1.23.592-2.323 1.51-3.008z" />
                </svg>
                <span className="self-center text-lg font-semibold whitespace-nowrap">
                  Noted
                </span>
              </Link>
              <div className="flex md:hidden md:order-2">
                <button
                  data-collapse-toggle="mobile-menu-3"
                  type="button"
                  className="md:hidden text-gray-400 dark:text-gray-200 hover:text-gray-900 dark:hover:text-gray-200 rounded-lg inline-flex items-center justify-center"
                  aria-controls="mobile-menu-3"
                  aria-expanded="false"
                  onClick={() => setShowMobileMenu((current) => !current)}
                >
                  <span className="sr-only">Open main menu</span>
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  <svg
                    className="hidden w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <div
                className={[
                  "md:flex justify-between items-end w-full md:w-auto md:order-1 animate-in slide-in-from-left",
                  showMobileMenu ? "block" : "hidden",
                ].join(" ")}
                id="mobile-menu-3"
              >
                <ul className="flex-col md:flex-row flex md:space-x-4 mt-4 md:mt-0 md:text-sm md:font-medium">
                  <NavbarLink pathname={pathname} route="/" routeName="Home" />
                  <NavbarLink
                    pathname={pathname}
                    route="/demo"
                    routeName="Demo"
                  />
                  <div className="flex items-center justify-end md:justify-start mt-4 mb-2 md:m-0 space-x-2">
                    <Switch
                      id="dark-mode"
                      checked={isDarkMode}
                      onCheckedChange={(event) => {
                        setIsDarkMode(event.valueOf());
                      }}
                    />
                    <Label htmlFor="dark-mode">
                      {isDarkMode ? "Dark" : "Light"} Mode
                    </Label>
                  </div>
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-1 flex flex-col">{children}</main>
      </body>
    </html>
  );
}
