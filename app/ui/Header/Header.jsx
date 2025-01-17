"use client";

import Image from "next/image";
import Logo from "@/public/Star_Wars_Logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Header component that displays the logo and a navigation button based on the current path.
 * @returns {JSX.Element} The rendered header component.
 */
const Header = () => {
  const path = usePathname();

  return (
    <div className="bg-black h-[10vh]">
      <div className="container mx-auto px-6 py-2 flex justify-between items-center h-[100%]">
        <Link href={`/`} className="h-fit" scroll={false}>
          <div className="w-24 h-auto flex  content-center">
            <Image src={Logo} alt="Starwars logo" priority />
          </div>
        </Link>
        {path === "/" || path === "/heroesList" ? null : (
          <Link className="h-fit" href={`/heroesList/`} scroll={false}>
            <button className="bg-yellow-300 hover:bg-yellow-400 py-2 px-4 border border-yellow-300 hover:border-yellow-400 rounded">
              Go to list
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
