"use client";
import {
  BellIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@chakra-ui/icons";
import { useForm } from "react-hook-form";
import {HStack} from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import MobileMenu from "@/components/mobile-menu";
import AccountMenu from "@/components/account-menu";
import NavbarItem from "./navbar-item";
import NetflixIcon from "./Netflix-icon";
import { useCallback, useState, useEffect } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import useSearchModel from "@/hooks/useSearchModel";
import SearchBar from "./search-bar";

interface SearchProps {
  search: string;
}
const Navbar = () => {
  const pathname = usePathname();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  
  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu((current) => !current);
  }, []);

  const TOP_OFFSET = 66;

  useEffect(() => {
    const handScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };
    window.addEventListener("scroll", handScroll);

    return () => window.removeEventListener("scroll", handScroll);
  }, []);

  const NavbarItemData = [
    {
      label: "Home",
      href: "Home",
      active: pathname === "Home",
    },
    {
      label: "Series",
      href: "Series",
      active: pathname === "Series",
    },
    {
      label: "Films",
      href: "Films",
      active: pathname === "Films",
    },
    {
      label: "New & Popular",
      href: "Popular",
      active: pathname === "Popular",
    },
    {
      label: "My List",
      href: "My-list",
      active: pathname === "My-list",
    },
    {
      label: "Browse by languages",
      href: "Browse by languages",
      active: pathname === "Browse-by-languages",
    },
  ];

  return (
    <nav
      className={cn(
        "flex w-full justify-between items-center px-10 py-4 fixed z-[100] transition duration-500",
        showBackground ? "bg-black/90" : ""
      )}
    >
      <div className={"flex lg:gap-10 items-center justify-center"}>
        <div
          className={cn(
            "h-10 flex flex-row items-center transition duration-500",
            showBackground ? "bg-black" : ""
          )}
        >
          <NetflixIcon />
        </div>
        <div
          className="
      flex-row
      gap-7
      hidden
      lg:flex
      "
        >
          {NavbarItemData.map((Item) => (
            <NavbarItem
              key={Item.label}
              label={Item.label}
              ClassName={Item.active ? "text-white" : ""}
            />
          ))}
        </div>
        <div className="relative ml-8">
          <div
            onClick={toggleMobileMenu}
            className="lg:hidden flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <p className="text-white text-sm">Browse</p>
            {showMobileMenu ? (
              <ChevronUpIcon color={"white"} />
            ) : (
              <ChevronDownIcon color={"white"} />
            )}
          </div>
          <MobileMenu visible={showMobileMenu} />
        </div>
      </div>
      <HStack className="sm:flex hidden gap-5">

        <SearchBar/>
        <span className="text-white font-base font-sans text-lg">Kids</span>
        <BellIcon color={"white"} cursor={"pointer"} boxSize={30} />
        <div
          onClick={toggleAccountMenu}
          className="flex items-center cursor-pointer"
        >
          <div className="relative h-10 w-10">
            <Image
              src={"/images/default-blue.png"}
              className="rounded-md"
              fill
              alt="Profile"
            />
          </div>

          {showAccountMenu ? (
            <ChevronUpIcon color={"white"} boxSize={6} />
          ) : (
            <ChevronDownIcon color={"white"} boxSize={6} />
          )}
        </div>
        <AccountMenu visible={showAccountMenu} />
      </HStack>
    </nav>
  );
};

export default Navbar;
