"use client";

import Image from "next/image";
import Logo from "./../../public/Star_Wars_Logo.svg";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Header = () => {
  const path = usePathname();

  return (
    <div className="bg-black mb-6">
      <div className="container mx-auto px-6 h-16 py-2 flex justify-between content-center ">
        <Link href={`/`}>
          <div className="w-16 h-auto flex  content-center">
            <Image src={Logo} alt="Starwars logo" />
          </div>
        </Link>
        {path === "/" || path === "/heroesList" ? null : (
          <Link href={`/heroesList`}>
            <button className="bg-yellow-300 hover:bg-yellow-400 py-2 px-4 border border-yellow-300 hover:border-yellow-400 rounded">
              GO TO LIST
            </button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
