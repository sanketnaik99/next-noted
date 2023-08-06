import Link from "next/link";
import React from "react";

const NavbarLink = ({
  pathname,
  route,
  routeName,
}: {
  pathname: string;
  route: string;
  routeName: string;
}) => {
  return (
    <Link
      href={route}
      className={[
        "block pl-3 pr-4 py-2 md:px-4 md:py-2 rounded md:hover:bg-gray-100 dark:md:hover:bg-gray-900",
        pathname === route
          ? "text-white bg-blue-700 md:bg-gray-100 dark:md:bg-gray-900 md:text-blue-700 dark:md:text-blue-400"
          : "",
      ].join(" ")}
    >
      {routeName}
    </Link>
  );
};

export default NavbarLink;
