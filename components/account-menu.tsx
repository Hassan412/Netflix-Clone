"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import { cn } from "@/lib/utils";
import { UserData } from "@/types";
import { signOut } from 'next-auth/react'
import Image from "next/image";
interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {

  const { data } = useCurrentUser()

  const User:UserData = data
  
  return (
    <div
      className={cn(
        "transition translate-y-6 opacity-0 bg-black w-56 absolute top-20 right-10 py-5 flex-col flex border-2 border-gray-800",
        visible ? "translate-y-0 opacity-100" : ""
      )}
    >
        <div className="flex flex-col gap-3">
            <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
              <div className="relative w-8 h-8">
                <Image src={"/images/default-blue.png"} className="rounded-md" fill alt="Profile"/>
                </div>
                <p className="text-white group-hover/item:underline">{User?.name}</p>
            </div>
            <hr className="bg-gray-600 border-0 h-px my-4"/>
            <div onClick={()=> signOut()} className="px-3 text-center text-white texxt-sm hover:underline cursor-pointer">
              Sign out of Netflix
            </div>
        </div>
    </div>
  );
};

export default AccountMenu;
